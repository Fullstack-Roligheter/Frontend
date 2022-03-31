import { changePage } from './router.js'

export const registerSideBarBtn = (id, page) => {
    const SideBarBtn = document.getElementById(id)
    SideBarBtn.addEventListener('click', () => {
      changePage(page)
    })
  }

