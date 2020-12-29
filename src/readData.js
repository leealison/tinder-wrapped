function getTotalSwipes(data) {
  //console.log(data);
  const swipeLikes = Object.values(data["swipes_likes"]);
  let swipeLikesNum = 0;
  for (let i = 0; i < swipeLikes.length; i++) {
    swipeLikesNum += swipeLikes[i];
  }
  const swipePasses = Object.values(data["swipes_passes"]);
  let swipePassesNum = 0;
  for (let i = 0; i < swipePasses.length; i++) {
    swipePassesNum += swipePasses[i];
  }
  return {
    swipeLikes: swipeLikesNum,
    swipePasses: swipePassesNum
  };
}

export { getTotalSwipes }