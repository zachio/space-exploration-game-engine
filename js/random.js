var random = {
  pick(list) {
      return list[Math.floor(Math.random() * list.length)]
  },
  between(min, max){
    return Math.random() * (max - min) + min
  }
}