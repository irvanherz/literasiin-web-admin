import LayoutAdmin from './LayoutAdmin'
import LayoutBlank from './LayoutBlank'
import LayoutDefault from './LayoutDefault'
import LayoutScaffold from './LayoutScaffold'

type LayoutType = typeof LayoutDefault & {
  Default: typeof LayoutDefault
  Blank: typeof LayoutBlank
  Admin: typeof LayoutAdmin
  Scaffold: typeof LayoutScaffold
}

const Layout: LayoutType = LayoutDefault as LayoutType

Layout.Default = LayoutDefault
Layout.Admin = LayoutAdmin
Layout.Blank = LayoutBlank
Layout.Scaffold = LayoutScaffold

export default Layout
