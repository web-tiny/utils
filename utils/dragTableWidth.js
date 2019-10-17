/*
 * @Author: Tiny
 * @Date: 2019-10-16 10:42:38
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-10-17 11:13:01
 */

export default class DragTableWidth {
  constructor (id) {
    this._el = document.querySelector(`#${id}`)
    this._tables = Array.from(this._el.querySelectorAll('table'))

    this.store = {
      dragging: false, // 是否拖动
      draggingColumn: null, // 拖动的对象
      miniWidth: 70, // 拖动的最小宽度
      startMouseLeft: undefined, // 鼠标点击时的clientX
      startLeft: undefined,  // th右离table的距离
      startColumnLeft: undefined, // th左离table的距离
      tableLeft: undefined, // table离页面左边的距离,
      HColumns: [],
      BColumns: []
    }
    setTimeout(() => this._resolveDom())
  }

  _saveCols (header, body) {
    // cols
    this.store.HColumns = Array.from(header.querySelectorAll('col')).map(v => ({
      el: v,
      isChange: false
    }))
    this.store.BColumns = Array.from(body.querySelectorAll('col')).map(v => ({
      el: v,
      isChange: false
    }))
  }

  _resolveDom () {
    const [ THeader ] = this._tables
    let TBody
    const Tr = THeader.tHead.rows[0]
    const columns = Array.from(Tr.cells)
    const Bcolgroup = document.createElement('colgroup')

    const cols = columns.map((item, index) => {
      const col = document.createElement('col')
      item.dataset.index = index
      col.width = +item.offsetWidth
      return col
    })
    cols.reduce((newDom, item) => {
      newDom.appendChild(item)
      return newDom
    }, Bcolgroup)
    const HColgroup = Bcolgroup.cloneNode(true)

    // 都把header,body提出来
    var HFirstChild = THeader.firstChild
    if (this._tables.length === 1) {
      const [ , tbody ] = Array.from(THeader.children)
      tbody.remove()
      THeader.insertBefore(HColgroup, HFirstChild)

      TBody = THeader.cloneNode()
      TBody.appendChild(Bcolgroup)
      TBody.appendChild(tbody)
      this._el.appendChild(TBody)
    } else {
      // var HFirstChild = THeader.firstChild
      THeader.insertBefore(HColgroup, HFirstChild)
      const [TBody] = this._tables
      const BFirstChild = TBody.firstChild
      TBody.insertBefore(Bcolgroup, BFirstChild)
    }

    // 拖动时的占位线
    const hold = document.createElement('div')
    hold.classList.add('resizable-hold')
    this._el.appendChild(hold)

    // 把cols缓存起来
    this._saveCols(THeader, TBody)

    // 处理事件
    Tr.addEventListener('mousemove', this.handleMouseMove.bind(this))
    Tr.addEventListener('mouseout', this.handleMouseOut.bind(this))

    // 处理拖动
    const handleMouseDown = (evt) => {
      if (this.store.draggingColumn) {
        this.store.dragging = true

        let { target } = evt
        while (target && target.tagName !== 'TH') {
          target = target.parentNode
        }

        if (!target) return

        const tableEle = THeader
        const tableLeft = tableEle.getBoundingClientRect().left
        const columnRect = target.getBoundingClientRect()
        const minLeft = columnRect.left - tableLeft + this.store.miniWidth
        target.classList.add('noclick')

        this.store.startMouseLeft = evt.clientX
        this.store.startLeft = columnRect.right - tableLeft
        this.store.startColumnLeft = columnRect.left - tableLeft
        this.store.tableLeft = tableLeft

        document.onselectstart = () => false
        document.ondragstart = () => false

        hold.style.display = 'block'
        hold.style.left = this.store.startLeft + 'px'

        const handleOnMouseMove = (event) => {
          const deltaLeft = event.clientX - this.store.startMouseLeft
          const proxyLeft = this.store.startLeft + deltaLeft

          hold.style.left = Math.max(minLeft, proxyLeft) + 'px'
        }

        // 宽度是这样分配的，如果a,b,c,d，他们每个都有个changed状态，默认false，拖过a,a.changed改为true，改变的宽度就由剩下的b,c,d平摊，如果都改变了，就让最后一个元素d背锅
        const handleOnMouseUp = (event) => {
          if (this.store.dragging) {
            const { startColumnLeft } = this.store
            const finalLeft = parseInt(hold.style.left, 10)
            const columnWidth = finalLeft - startColumnLeft
            const index = +target.dataset.index
            HColgroup.children[index].width = columnWidth
            if (index !== this.store.HColumns.length - 1) {
              this.store.HColumns[index].isChange = true
            }
            const deltaLeft = event.clientX - this.store.startMouseLeft
            const changeColumns = this.store.HColumns.filter((v, i) => i > index && !v.isChange && +v.el.width > 30)
            changeColumns.forEach(item => {
              item.el.width = +item.el.width - deltaLeft / changeColumns.length
            })

            this.store.BColumns.forEach((item, i) => {
              item.el.width = this.store.HColumns[i].el.width
            })

            hold.style.display = 'none'

            document.body.style.cursor = ''
            this.store.dragging = false
            this.store.draggingColumn = null
            this.store.startMouseLeft = undefined
            this.store.startLeft = undefined
            this.store.startColumnLeft = undefined
            this.store.tableLeft = undefined
          }

          document.removeEventListener('mousemove', handleOnMouseMove)
          document.removeEventListener('mouseup', handleOnMouseUp)
          document.onselectstart = null
          document.ondragstart = null

          setTimeout(() => {
            target.classList.remove('noclick')
          }, 0)
        }

        document.addEventListener('mouseup', handleOnMouseUp)
        document.addEventListener('mousemove', handleOnMouseMove)
      }
    }
    Tr.addEventListener('mousedown', handleMouseDown)
  }

  handleMouseMove (evt) {
    let { target } = evt
    while (target && target.tagName !== 'TH') {
      target = target.parentNode
    }

    if (!target) return

    if (!this.store.dragging) {
      const rect = target.getBoundingClientRect()
      const bodyStyle = document.body.style
      if (rect.width > 12 && rect.right - evt.pageX < 8) {
        bodyStyle.cursor = 'col-resize'
        target.style.cursor = 'col-resize'
        this.store.draggingColumn = target
      } else {
        bodyStyle.cursor = ''
        target.style.cursor = 'pointer'
        this.store.draggingColumn = null
      }
    }
  }
}
