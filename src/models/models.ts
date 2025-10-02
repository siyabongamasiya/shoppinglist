export class User {
  EmailAddress!: string;
  Password!: string;
  Name!: string;
  Surname!: string;
  Cellnumber!: string;
  shoppingLists: ShoppingList[] = [];

  constructor(
    email: string,
    password: string,
    name: string,
    surname: string,
    cellnumber: string
  ) {
    this.EmailAddress = email;
    this.Password = password;
    this.Name = name;
    this.Surname = surname;
    this.Cellnumber = cellnumber;
  }
}

export class ShoppingList {
  ShoppingListId!: string;
  ShoppingListName!: string;
  ShoppingListDate!: string;
  ShoppingListcategory!: string;
  ShoppingListItems!: ShoppingListItem[];

  constructor(
    shoppingListId: string = "",
    shoppingListName: string,
    shoppingListdate:string,
    shoppingListcategory: string,
    shoppingListItems: ShoppingListItem[]
  ) {
    this.ShoppingListId = shoppingListId;
    this.ShoppingListName = shoppingListName;
    this.ShoppingListDate = shoppingListdate;
    this.ShoppingListcategory = shoppingListcategory;
    this.ShoppingListItems = shoppingListItems;
  }
}

export class ShoppingListItem {
  ShoppingListItemId!: string;
  ShoppingListItemName!: string;
  ShoppingListItemQuantity!: number;
  ShoppingListItemNotes!: string;
  ShoppingListItemCategory!: string;

  constructor(
    shoppingListItemId: string,
    shoppingListItemName: string,
    shoppingListItemNotes: string,
    shoppingListItemQuantity: number,
    shoppingListItemCategory: string
  ) {
    this.ShoppingListItemId = shoppingListItemId;
    this.ShoppingListItemName = shoppingListItemName;
    this.ShoppingListItemQuantity = shoppingListItemQuantity;
    this.ShoppingListItemNotes = shoppingListItemNotes
    this.ShoppingListItemCategory = shoppingListItemCategory;
  }
}
