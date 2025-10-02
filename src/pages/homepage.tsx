import { useState, useMemo } from 'react';
import { Navigation } from './Navigation';
import { toast } from 'sonner';
import '../styles/HomePage.css';
import type { ShoppingList, User } from '../models/models';
import { SearchControls } from '../components/SearchControls';
import { ShoppingListsGrid } from '../components/ShoppingListsGrid';
import { AddListDialog } from '../components/AddListDialog';
import { EditListDialog } from '../components/EditListDialog';

type HomePageProps = {
  user: User;
  shoppingLists: ShoppingList[];
  onLogout: () => void;
  onNavigateToProfile: () => void;
  onNavigateToListDetail: (listId: string) => void;
  onAddList: (name: string, category: string) => void;
  onUpdateList: (listId: string, name: string, category: string) => void;
  onDeleteList: (listId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'name' | 'category' | 'date';
  setSortBy: (sortBy: 'name' | 'category' | 'date') => void;
};

export function HomePage({
  user,
  shoppingLists,
  onLogout,
  onNavigateToProfile,
  onNavigateToListDetail,
  onAddList,
  onUpdateList,
  onDeleteList,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: HomePageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<ShoppingList | null>(null);
  const [newListName, setNewListName] = useState('');
  const [newListCategory, setNewListCategory] = useState('');

  // Filter and sort lists
  const filteredAndSortedLists = useMemo(() => {
    let filtered = shoppingLists.filter(
      (list) =>
        list.ShoppingListName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.ShoppingListcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.ShoppingListName.localeCompare(b.ShoppingListName);
      } else if (sortBy === 'category') {
        return a.ShoppingListcategory.localeCompare(b.ShoppingListcategory);
      } else {
        return new Date(b.ShoppingListDate).getTime() - new Date(a.ShoppingListDate).getTime();

      }
    });

    return sorted;
  }, [shoppingLists, searchQuery, sortBy]);

  const handleAddList = () => {
    if (!newListName || !newListCategory) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddList(newListName, newListCategory);
    setNewListName('');
    setNewListCategory('');
    setIsAddDialogOpen(false);
    toast.success('Shopping list created!');
  };

  const handleEditList = () => {
    if (!editingList || !newListName || !newListCategory) {
      toast.error('Please fill in all fields');
      return;
    }

    onUpdateList(editingList.ShoppingListId, newListName, newListCategory);
    setEditingList(null);
    setNewListName('');
    setNewListCategory('');
    setIsEditDialogOpen(false);
    toast.success('Shopping list updated!');
  };

  const handleDeleteList = (listId: string, listName: string) => {
    if (confirm(`Are you sure you want to delete "${listName}"?`)) {
      onDeleteList(listId);
      toast.success('Shopping list deleted!');
    }
  };

  const openEditDialog = (list: ShoppingList) => {
    setEditingList(list);
    setNewListName(list.ShoppingListName);
    setNewListCategory(list.ShoppingListcategory);
    setIsEditDialogOpen(true);
  };

  

  return (
    <div className="home-page">
      <Navigation
        user={user}
        onNavigateToHome={() => {}}
        onNavigateToProfile={onNavigateToProfile}
        onLogout={onLogout}
        currentPage="home"
      />

      <div className="home-container">
        <div className="home-header">
          <h1>My Shopping Lists</h1>
          <p>Manage and organize all your shopping lists in one place</p>
        </div>

        {/* Search and Controls */}
        <SearchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy as any}
          onAddClick={() => setIsAddDialogOpen(true)}
        />

        {/* Shopping Lists Grid */}
        <ShoppingListsGrid
          lists={filteredAndSortedLists}
          searchQuery={searchQuery}
          onCreateClick={() => setIsAddDialogOpen(true)}
          onView={onNavigateToListDetail}
          onEdit={openEditDialog}
          onDelete={handleDeleteList}
        />
      </div>

      {/* Add List Dialog */}
      <AddListDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        newListName={newListName}
        setNewListName={setNewListName}
        newListCategory={newListCategory}
        setNewListCategory={setNewListCategory}
        onConfirm={handleAddList}
      />

      {/* Edit List Dialog */}
      <EditListDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        newListName={newListName}
        setNewListName={setNewListName}
        newListCategory={newListCategory}
        setNewListCategory={setNewListCategory}
        onConfirm={handleEditList}
      />
    </div>
  );
}
