class ItemData {
  constructor(id) {
    this.id = id;
  }
}

export class GridItemData extends ItemData {
  constructor(id, src, caption, date, likeCount, isLiked) {
    super(id);
    this.src = src;
    this.caption = caption;
    this.date = date;
    this.likeCount = likeCount;
    this.isLiked = isLiked;
  }
}

export const gridItemsData = [
  new GridItemData("id00", "./images/mia-small-id00.jpg", "First Shower I", "04/18/2019", 35, false),
  new GridItemData("id01", "./images/mia-small-id01.jpg", "Daddy Ziv I", "05/06/2019", 23, false),
  new GridItemData("id02", "./images/mia-small-id02.jpg", "Me, Pretty", "10/02/2019", 5, false),
  new GridItemData("id03", "./images/mia-small-id03.jpg", "Destructive Me I", "04/30/2019", 17, false),
  new GridItemData("id04", "./images/mia-small-id04.jpg", "Daddy Ami II", "09/18/2019", 19, false),
  new GridItemData("id05", "./images/mia-small-id05.jpg", "Fryman Canyon Trail I", "07/13/2019", 5, false),
  new GridItemData("id06", "./images/mia-small-id06.jpg", "Chucky/Serial Killer I", "10/31/2019", 5, false),
  new GridItemData("id07", "./images/mia-small-id07.jpg", "Chucky/Serial Killer II", "10/31/2019", 5, false),
  new GridItemData("id08", "./images/mia-small-id08.jpg", "With Blue", "10/03/2019", 15, false),
  new GridItemData("id09", "./images/mia-small-id09.jpg", "Runyon Canyon I", "09/01/2019", 21, false),
  new GridItemData("id10", "./images/mia-small-id10.jpg", "Daddy Ziv III", "09/18/2019", 33, false),
  new GridItemData("id11", "./images/mia-small-id11.jpg", "Fryman Canyon Trail II", "07/13/2019", 17, false),
  new GridItemData("id12", "./images/mia-small-id12.jpg", "Napping II", "09/18/2019", 15, false),
  new GridItemData("id13", "./images/mia-small-id13.jpg", "Catnap I", "08/23/2019", 21, false),
  new GridItemData("id14", "./images/mia-small-id14.jpg", "Fryman Canyon Trail III", "07/13/2019", 25, false),
  new GridItemData("id15", "./images/mia-small-id15.jpg", "Fryman Canyon Trail IV", "07/13/2019", 17, false),
  new GridItemData("id16", "./images/mia-small-id16.jpg", "Daddy Ziv IV", "09/02/2019", 15, false),
  new GridItemData("id17", "./images/mia-small-id17.jpg", "Catnap II", "07/11/2019", 25, false),
  new GridItemData("id18", "./images/mia-small-id18.jpg", "Catnap III", "07/11/2019", 5, false),
  new GridItemData("id19", "./images/mia-small-id19.jpg", "Life Is Good", "08/12/2019", 17, false),
  new GridItemData("id20", "./images/mia-small-id20.jpg", "Destructive Me II", "05/18/2019", 2, false),
  new GridItemData("id21", "./images/mia-small-id21.jpg", "Daddy Ziv II", "08/14/2019", 5, false),
  new GridItemData("id22", "./images/mia-small-id22.jpg", "With Marc I", "06/06/2019", 21, false),
  new GridItemData("id24", "./images/mia-small-id24.jpg", "With Marc II", "06/12/2019", 15, false),
  new GridItemData("id25", "./images/mia-small-id25.jpg", "Destruction", "07/21/2019", 21, false),
  new GridItemData("id26", "./images/mia-small-id26.jpg", "Daddy Ami I", "08/01/2019", 31, false),
  new GridItemData("id27", "./images/mia-small-id27.jpg", "Napping I", "07/19/2019", 5, false),
  new GridItemData("id28", "./images/mia-small-id28.jpg", "Destructive Me III", "07/19/2019", 5, false),
  new GridItemData("id29", "./images/mia-small-id29.jpg", "With Daphna", "09/01/2019", 12, false),
  new GridItemData("id30", "./images/mia-small-id30.jpg", "Head Licking", "06/17/2019", 15, false),
  new GridItemData("id31", "./images/mia-small-id31.jpg", "First Shower II", "04/18/2019", 21, false),
  new GridItemData("id32", "./images/mia-small-id32.jpg", "Play Time", "09/09/2019", 15, false),
  new GridItemData("id33", "./images/mia-small-id33.jpg", "Napping III", "11/02/2019", 45, false),
  new GridItemData("id34", "./images/mia-small-id34.jpg", "Napping IV", "11/11/2019", 9, false),
  new GridItemData("id35", "./images/mia-small-id35.jpg", "Playing I", "01/09/2020", 12, false),
  new GridItemData("id36", "./images/mia-small-id36.jpg", "Playing II", "01/09/2020", 21, false),
  new GridItemData("id37", "./images/mia-small-id37.jpg", "Playing III", "01/09/2020", 9, false)
];