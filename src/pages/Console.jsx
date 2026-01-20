import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Sidebar from '@/components/console/Sidebar';
import AddSiteModal from '@/components/console/AddSiteModal';
import WorkspaceHeader from '@/components/console/WorkspaceHeader';
import SettingsView from '@/components/console/SettingsView';
import EmptyWorkspace from '@/components/console/EmptyWorkspace';
import IframeViewer from '@/components/console/IframeViewer';

export default function Console() {
  const [user, setUser] = useState(null);
  const [activeSite, setActiveSite] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Fetch sites
  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites'],
    queryFn: () => base44.entities.Site.list('-created_date'),
  });

  // Auto-select first site
  useEffect(() => {
    if (sites.length > 0 && !activeSite) {
      setActiveSite(sites[0]);
    }
  }, [sites, activeSite]);

  // Mutations
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
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      if (activeSite?.id === deletedId) {
        setActiveSite(null);
      }
    },
  });

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleAddSite = async (siteData) => {
    await createSiteMutation.mutateAsync(siteData);
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
            <SettingsView user={user} sitesCount={sites.length} />
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
    </div>
  );
}