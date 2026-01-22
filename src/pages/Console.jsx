import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Sidebar from '@/components/console/Sidebar';
import AddSiteModal from '@/components/console/AddSiteModal';
import AddWorkspaceModal from '@/components/console/AddWorkspaceModal';
import WorkspaceHeader from '@/components/console/WorkspaceHeader';
import SettingsView from '@/components/console/SettingsView';
import EmptyWorkspace from '@/components/console/EmptyWorkspace';
import IframeViewer from '@/components/console/IframeViewer';

export default function Console() {
  const [user, setUser] = useState(null);
  const [activeSite, setActiveSite] = useState(null);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState('workspace');

  const queryClient = useQueryClient();

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await base44.auth.me();
      setUser(userData);
    };
    fetchUser();
  }, []);

  // Fetch workspaces
  const { data: workspaces = [] } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => base44.entities.Workspace.list('-created_date'),
  });

  // Fetch sites (filtered by active workspace)
  const { data: allSites = [], isLoading } = useQuery({
    queryKey: ['sites'],
    queryFn: () => base44.entities.Site.list('-created_date'),
  });

  // Filter sites by active workspace
  const sites = activeWorkspace
    ? allSites.filter(site => site.workspace_id === activeWorkspace.id)
    : [];

  // Auto-select first workspace
  useEffect(() => {
    if (workspaces.length > 0 && !activeWorkspace) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [workspaces]);

  // Auto-select first site and validate active site exists
  useEffect(() => {
    if (sites.length === 0) {
      setActiveSite(null);
      return;
    }

    // Check if current activeSite still exists in the list
    if (activeSite) {
      const siteExists = sites.find(s => s.id === activeSite.id);
      if (!siteExists) {
        // Active site was deleted, select first available
        setActiveSite(sites[0]);
      }
    } else {
      // No active site, select first one
      setActiveSite(sites[0]);
    }
  }, [sites]);

  // Mutations
  const createWorkspaceMutation = useMutation({
    mutationFn: (data) => base44.entities.Workspace.create(data),
    onSuccess: (newWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      setActiveWorkspace(newWorkspace);
      setIsWorkspaceModalOpen(false);
    },
  });

  const deleteWorkspaceMutation = useMutation({
    mutationFn: (id) => base44.entities.Workspace.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      setActiveWorkspace(null);
    },
  });

  const createSiteMutation = useMutation({
    mutationFn: (data) => base44.entities.Site.create(data),
    onSuccess: (newSite) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setActiveSite(newSite);
      setIsModalOpen(false);
    },
  });

  const deleteSiteMutation = useMutation({
    mutationFn: (id) => base44.entities.Site.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setActiveSite(null);
    },
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleAddWorkspace = async (workspaceData) => {
    await createWorkspaceMutation.mutateAsync(workspaceData);
  };

  const handleDeleteWorkspace = async (id) => {
    await deleteWorkspaceMutation.mutateAsync(id);
  };

  const handleAddSite = async (siteData) => {
    if (!activeWorkspace) {
      alert('Por favor, selecione ou crie um workspace primeiro.');
      return;
    }
    await createSiteMutation.mutateAsync({ ...siteData, workspace_id: activeWorkspace.id });
  };

  const handleDeleteSite = async (id) => {
    await deleteSiteMutation.mutateAsync(id);
  };

  // Mobile sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        user={user}
        sites={sites}
        activeSite={activeSite}
        setActiveSite={setActiveSite}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        view={view}
        setView={setView}
        onAddClick={() => setIsModalOpen(true)}
        onDeleteSite={handleDeleteSite}
        onLogout={handleLogout}
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        onSelectWorkspace={setActiveWorkspace}
        onAddWorkspace={() => setIsWorkspaceModalOpen(true)}
        onDeleteWorkspace={handleDeleteWorkspace}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-slate-950 overflow-hidden">
        <WorkspaceHeader activeSite={activeSite} view={view} />

        <div className="flex-1 relative overflow-hidden flex flex-col">
          {view === 'workspace' ? (
            activeSite ? (
              <IframeViewer site={activeSite} />
            ) : (
              <EmptyWorkspace onAddClick={() => setIsModalOpen(true)} />
            )
          ) : (
            <SettingsView 
              user={user} 
              sitesCount={sites.length} 
              sites={sites}
              onDeleteSite={handleDeleteSite}
            />
          )}
        </div>
      </main>

      {/* Add Site Modal */}
      <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSite}
        isLoading={createSiteMutation.isPending}
      />

      {/* Add Workspace Modal */}
      <AddWorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        onSubmit={handleAddWorkspace}
        isLoading={createWorkspaceMutation.isPending}
      />
    </div>
  );
}