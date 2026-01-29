import React, { useState, useEffect, lazy, Suspense } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

import Sidebar from '@/components/console/Sidebar';
import WorkspaceHeader from '@/components/console/WorkspaceHeader';
import EmptyWorkspace from '@/components/console/EmptyWorkspace';

// Lazy load heavy components
const IframeViewer = lazy(() => import('@/components/console/IframeViewer'));
const AddSiteModal = lazy(() => import('@/components/console/AddSiteModal'));
const AddWorkspaceModal = lazy(() => import('@/components/console/AddWorkspaceModal'));
const MoveSiteModal = lazy(() => import('@/components/console/MoveSiteModal'));
const SettingsView = lazy(() => import('@/components/console/SettingsView'));

export default function Console() {
  const [user, setUser] = useState(null);
  const [activeSite, setActiveSite] = useState(null);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [siteToMove, setSiteToMove] = useState(null);
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

  // Fetch sites (filtered by active workspace only)
  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites', activeWorkspace?.id],
    queryFn: () => {
      if (!activeWorkspace?.id) return [];
      return base44.entities.Site.filter({ workspace_id: activeWorkspace.id }, '-created_date');
    },
    enabled: !!activeWorkspace,
  });

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
      toast.success('Workspace criado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao criar workspace');
    },
  });

  const deleteWorkspaceMutation = useMutation({
    mutationFn: (id) => base44.entities.Workspace.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      setActiveWorkspace(null);
      toast.success('Workspace excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir workspace');
    },
  });

  const createSiteMutation = useMutation({
    mutationFn: (data) => base44.entities.Site.create(data),
    onSuccess: (newSite) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setActiveSite(newSite);
      setIsModalOpen(false);
      toast.success('Aplicação adicionada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao adicionar aplicação');
    },
  });

  const deleteSiteMutation = useMutation({
    mutationFn: (id) => base44.entities.Site.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setActiveSite(null);
      toast.success('Aplicação excluída com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir aplicação');
    },
  });

  const moveSiteMutation = useMutation({
    mutationFn: ({ siteId, newWorkspaceId }) => 
      base44.entities.Site.update(siteId, { workspace_id: newWorkspaceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setIsMoveModalOpen(false);
      setSiteToMove(null);
      setActiveSite(null);
      toast.success('Aplicação movida com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao mover aplicação');
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

  const handleMoveSite = async (siteId, newWorkspaceId) => {
    await moveSiteMutation.mutateAsync({ siteId, newWorkspaceId });
  };

  const openMoveModal = (site) => {
    setSiteToMove(site);
    setIsMoveModalOpen(true);
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
    <div className="h-screen w-full flex bg-slate-950 dark:bg-slate-950 text-slate-200 dark:text-slate-200 overflow-hidden font-sans light:bg-slate-50 light:text-slate-900">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

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
        onMoveSite={openMoveModal}
        onLogout={handleLogout}
        workspaces={workspaces}
        activeWorkspace={activeWorkspace}
        onSelectWorkspace={setActiveWorkspace}
        onAddWorkspace={() => setIsWorkspaceModalOpen(true)}
        onDeleteWorkspace={handleDeleteWorkspace}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl touch-manipulation"
      >
        <Menu size={20} className="text-white" />
      </button>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-slate-950 dark:bg-slate-950 overflow-hidden light:bg-slate-50">
        <WorkspaceHeader activeSite={activeSite} view={view} />

        <div className="flex-1 relative overflow-hidden flex flex-col">
          {view === 'workspace' ? (
            activeSite ? (
              <Suspense fallback={
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-slate-500 font-medium">Carregando aplicação...</p>
                  </div>
                </div>
              }>
                <IframeViewer site={activeSite} />
              </Suspense>
            ) : (
              <EmptyWorkspace onAddClick={() => setIsModalOpen(true)} />
            )
          ) : (
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            }>
              <SettingsView 
                user={user} 
                sitesCount={sites.length} 
                sites={sites}
                onDeleteSite={handleDeleteSite}
                workspaces={workspaces}
                onDeleteWorkspace={handleDeleteWorkspace}
              />
            </Suspense>
          )}
        </div>
      </main>

      {/* Modals with lazy loading */}
      <Suspense fallback={null}>
        {isModalOpen && (
          <AddSiteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddSite}
            isLoading={createSiteMutation.isPending}
          />
        )}

        {isWorkspaceModalOpen && (
          <AddWorkspaceModal
            isOpen={isWorkspaceModalOpen}
            onClose={() => setIsWorkspaceModalOpen(false)}
            onSubmit={handleAddWorkspace}
            isLoading={createWorkspaceMutation.isPending}
          />
        )}

        {isMoveModalOpen && (
          <MoveSiteModal
            isOpen={isMoveModalOpen}
            onClose={() => {
              setIsMoveModalOpen(false);
              setSiteToMove(null);
            }}
            onSubmit={handleMoveSite}
            site={siteToMove}
            workspaces={workspaces}
            currentWorkspaceId={activeWorkspace?.id}
            isLoading={moveSiteMutation.isPending}
          />
        )}
      </Suspense>
    </div>
  );
}