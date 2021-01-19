function pluralize(time, label) {
    if (time === 1) {
      return time + label
    }
    return time + label + 's'
}
