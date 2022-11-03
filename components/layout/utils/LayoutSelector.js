import AdminLayout from "../admin/AdminLayout"
import Layout from '../Layout'

const LayoutSelector = (props) => {
  switch(props.children.type.layout) {
    case 'admin':
      return <AdminLayout>{props.children}</AdminLayout>
    case 'default':
      return <Layout>{props.children}</Layout>
  }
}
export default LayoutSelector