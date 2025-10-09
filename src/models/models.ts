export class User {
  id!: string;
  EmailAddress!: string;
  Password!: string;
  Name!: string;
  Surname!: string;
  Cellnumber!: string;
  shoppingLists: ShoppingList[] = [];

  constructor(
    id: string="",
    email: string,
    password: string,
    name: string,
    surname: string,
    cellnumber: string
  ) {
    this.id = id;
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
  ShoppingListItemQuantity!: string;
  ShoppingListItemNotes!: string;
  ShoppingListItemCategory!: string;
  ShoppingListitemImage!:string;

  constructor(
    shoppingListItemId: string,
    shoppingListItemName: string,
    shoppingListItemNotes: string,
    shoppingListItemQuantity: string,
    shoppingListItemCategory: string,
    shoppingListitemImage:string
  ) {
    this.ShoppingListItemId = shoppingListItemId;
    this.ShoppingListItemName = shoppingListItemName;
    this.ShoppingListItemQuantity = shoppingListItemQuantity;
    this.ShoppingListItemNotes = shoppingListItemNotes
    this.ShoppingListItemCategory = shoppingListItemCategory;
    this.ShoppingListitemImage = shoppingListitemImage;
  }
}
