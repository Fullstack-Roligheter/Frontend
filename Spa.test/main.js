import { render as page1Render } from './page1.js'
import { render as page2Render } from './page2.js'
import { render as page3Render } from './page3.js'
import { render as page4Render } from './page4.js'
import { render as page5Render } from './page5.js'
import { registerChangeListener } from './router.js'
import { Header } from './header.js'

const header = new Header()
const app = document.getElementById('app')

registerChangeListener((newPage) => {
  app.innerHTML = ''
  switch (newPage) {
    case 'page1':
      page1Render(app)
      break
    case 'page2':
      page2Render(app)
      break
    case 'page3':
      page3Render(app)
      break
    case 'page4':
      page4Render(app)
      break
    case 'page5':
      page5Render(app)
      break
  }
})

page1Render(app)
