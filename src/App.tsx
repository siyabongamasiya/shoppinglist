import { User } from "./models/models";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const user = new User(
    "siya@gmail.com",
    "password",
    "siyabonga",
    "khanyile",
    "0676984906"
  );
  return (
    <div style={{ padding: 16 }}>
      <HomePage
        user={user}
        shoppingLists={[]}
        onLogout={() => {}}
        onNavigateToProfile={() => {}}
        onNavigateToListDetail={() => {}}
        onAddList={() => {}}
        onUpdateList={() => {}}
        onDeleteList={() => {}}
        searchQuery=""
        setSearchQuery={() => {}}
        sortBy="date"
        setSortBy={() => {}}
      />
    </div>
  );
}
