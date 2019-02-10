var has_called_aphex = false;

first_enter() {
  print`
    You're in a church.
  `
}

enter() {
  print`
    The church is empty. The building looks like nobody has been in here for decades. You are in the main area of the church with the pews laying empty.
  `

  'Call Aphex'() {
    call_aphex()
  }

  choices['w'] = 'North Wing'() {
    print`
      You head towards the north wing.
    `

    go(church_north_wing)
  }

  choices['a'] = 'West Wing'() {
    print`
      You head towards the west wing.
    `;
    go(church_west_wing)
  }
}

exit() {
  print`
    You leave the church.
  `
}

call_aphex() {
  if (!has_called_aphex) {
    print`
      You call Aphex but there is no reply.
    `
    has_called_aphex = true
  } else {
    print`
      You already tried to call Aphex but you do it again. There is no reply.
    `
  }
}
