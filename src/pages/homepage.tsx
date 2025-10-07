import { useState, useMemo } from "react";
import { Navigation } from "../components/Navigation";
import { toast } from "sonner";
import "../styles/HomePage.css";
import type { ShoppingList } from "../models/models";
import { SearchControls, type SortBy } from "../components/SearchControls";
import { ShoppingListsGrid } from "../components/ShoppingListsGrid";
import { AddListDialog } from "../components/AddListDialog";
import { EditListDialog } from "../components/EditListDialog";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { editList } from "../features/shoppingListManagement";

type HomePageProps = {
  onLogout: () => void;
  onNavigateToProfile: () => void;
};

export function HomePage({ onLogout, onNavigateToProfile }: HomePageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState<ShoppingList | null>(null);
  const [newListName, setNewListName] = useState("");
  const [newListCategory, setNewListCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [editedListId, setEditedListId] = useState("");

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.userManagement);
  const dispatch = useAppDispatch();

  //take back to login if no user
  if (!user.isLoggedIn) {
    navigate("/login");
  }

  // Filter and sort lists
  const filteredAndSortedLists = useMemo(() => {
    let filtered = user.shoppingLists.filter(
      (list) =>
        list.ShoppingListName.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        list.ShoppingListcategory.toLowerCase().includes(
          searchQuery.toLowerCase()
        )
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.ShoppingListName.localeCompare(b.ShoppingListName);
      } else if (sortBy === "category") {
        return a.ShoppingListcategory.localeCompare(b.ShoppingListcategory);
      } else {
        return (
          new Date(b.ShoppingListDate).getTime() -
          new Date(a.ShoppingListDate).getTime()
        );
      }
    });

    return sorted;
  }, [user.shoppingLists, searchQuery, sortBy]);

  const handleAddList = () => {
    if (!newListName || !newListCategory) {
      toast.error("Please fill in all fields");
      return;
    }
    setNewListName("");
    setNewListCategory("");
    setIsAddDialogOpen(false);
    toast.success("Shopping list created!");
  };

  const handleEditList = () => {
    if (!editingList || !newListName || !newListCategory) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(
      editList({
        email: user.EmailAddress,
        shoppingListId: editedListId,
        updatedListData: {
          ShoppingListName: newListName,
          ShoppingListcategory: newListCategory,
        }
      })
    );

    setEditingList(null);
    setNewListName("");
    setNewListCategory("");
    setIsEditDialogOpen(false);
    toast.success("Shopping list updated!");
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
          sortBy={sortBy as SortBy}
          setSortBy={setSortBy}
          onAddClick={() => setIsAddDialogOpen(true)}
        />

        {/* Shopping Lists Grid */}
        <ShoppingListsGrid
          lists={filteredAndSortedLists}
          searchQuery={searchQuery}
          onCreateClick={() => setIsAddDialogOpen(true)}
          onEdit={(list: ShoppingList) => {
            setEditedListId(list.ShoppingListId);
            openEditDialog(list);
          }}
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
