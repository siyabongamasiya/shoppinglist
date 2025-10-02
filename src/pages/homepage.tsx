import { useState, useMemo } from 'react';
import { Navigation } from './Navigation';
import { Plus, Search, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import '../styles/HomePage.css';
import type { User } from '../models/models';

// Local interfaces for this page
interface ShoppingList {
  id: string;
  name: string;
  category: string;
  dateCreated: Date;
  items: unknown[];
}

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
        list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else {
        return b.dateCreated.getTime() - a.dateCreated.getTime();
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

    onUpdateList(editingList.id, newListName, newListCategory);
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
    setNewListName(list.name);
    setNewListCategory(list.category);
    setIsEditDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
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
        <div className="home-controls">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="search"
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="select-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="form-input"
            >
              <option value="date">Date Created</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>

          <button onClick={() => setIsAddDialogOpen(true)} className="btn">
            <Plus />
            Add New List
          </button>
        </div>

        {/* Shopping Lists Grid */}
        {filteredAndSortedLists.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-icon">
                <Search />
              </div>
              <div>
                <h3>No shopping lists found</h3>
                <p>
                  {searchQuery
                    ? 'Try adjusting your search'
                    : 'Create your first shopping list to get started'}
                </p>
              </div>
              {!searchQuery && (
                <button onClick={() => setIsAddDialogOpen(true)} className="btn">
                  <Plus />
                  Create Shopping List
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="lists-grid">
            {filteredAndSortedLists.map((list) => (
              <div key={list.id} className="list-card">
                <div className="list-card-header">
                  <div className="list-card-title-row">
                    <div className="list-card-title-content">
                      <h3 className="list-card-title">{list.name}</h3>
                      <p className="list-card-description">{list.category}</p>
                    </div>
                  </div>
                </div>

                <div className="list-card-content">
                  <div className="list-card-date">
                    <Calendar />
                    <span>{formatDate(list.dateCreated)}</span>
                  </div>
                  <p className="list-card-items">
                    {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="list-card-footer">
                  <button
                    className="btn btn-outline"
                    onClick={() => onNavigateToListDetail(list.id)}
                  >
                    <Eye />
                    View
                  </button>
                  <button
                    className="btn-ghost btn-sm"
                    onClick={() => openEditDialog(list)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="btn-ghost btn-sm"
                    onClick={() => handleDeleteList(list.id, list.name)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add List Dialog */}
      {isAddDialogOpen && (
        <div className="modal-overlay" onClick={() => setIsAddDialogOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Shopping List</h3>
              <p className="modal-description">
                Add a new shopping list to organize your items
              </p>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="listName" className="form-label">List Name</label>
                <input
                  id="listName"
                  placeholder="e.g., Weekly Groceries"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="listCategory" className="form-label">Category</label>
                <input
                  id="listCategory"
                  placeholder="e.g., Groceries, Hardware"
                  value={newListCategory}
                  onChange={(e) => setNewListCategory(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn" onClick={handleAddList}>Create List</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit List Dialog */}
      {isEditDialogOpen && (
        <div className="modal-overlay" onClick={() => setIsEditDialogOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Shopping List</h3>
              <p className="modal-description">
                Update your shopping list details
              </p>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="editListName" className="form-label">List Name</label>
                <input
                  id="editListName"
                  placeholder="e.g., Weekly Groceries"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="editListCategory" className="form-label">Category</label>
                <input
                  id="editListCategory"
                  placeholder="e.g., Groceries, Hardware"
                  value={newListCategory}
                  onChange={(e) => setNewListCategory(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </button>
              <button className="btn" onClick={handleEditList}>Update List</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
