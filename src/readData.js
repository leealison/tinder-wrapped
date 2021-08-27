function getTotalSwipes(data) {
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

function getTotalMatches(data) {
  const matches = Object.values(data["matches"]);
  let matchesNum = 0;
  for (let i = 0; i < matches.length; i++) {
    matchesNum += matches[i];
  }
  return matchesNum;
}

function getDaysWithMostMatches(data) {
  const matches = data["matches"];
  const keys = Object.keys(matches);
  keys.sort(function (a, b) { return matches[a] - matches[b] });
  let top5 = [];
  for (let i = keys.length - 1; i > keys.length - 6; i--) {
    const key = keys[i];
    const obj = {}
    obj[key] = matches[key];
    top5.push(obj);
  }
  return top5;
}

function getKeys(array) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(Object.keys(array[i]));
  }
  return output;
}

function getVals(array) {
  let output = [];
  for (let i = 0; i < array.length; i++) {
    output.push(Number(Object.values(array[i])));
  }
  return output;
}

function getMatchPercent(data) {
  const matchesNum = getTotalMatches(data);
  const swipes = getTotalSwipes(data);
  return ((matchesNum / (swipes["swipeLikes"])).toFixed(2)) * 100;
}

function getTop3AppOpens(data) {
  const appOpens = data["app_opens"]
  let sortable = [];
  Object.keys(appOpens).forEach((key, _) => {
    sortable.push([key, appOpens[key]])
  });

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });

  const len = sortable.length;
  const top3 = [sortable[len-1], sortable[len-2], sortable[len-3]];
  return top3;
}

function getAppOpenAverage(data) {
  const appOpens = data["app_opens"]
  let sum = 0;
  let len = 0;
  Object.keys(appOpens).forEach((key, _) => {
    sum += appOpens[key]
    len++;
  });
  return (sum / len).toFixed(2);
}

export {
  getTotalSwipes,
  getTotalMatches,
  getDaysWithMostMatches,
  getKeys,
  getVals,
  getMatchPercent,
  getTop3AppOpens,
  getAppOpenAverage
}