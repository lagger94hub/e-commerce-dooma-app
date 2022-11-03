import AdminLayout from '../admin/layout/AdminLayout'
import Layout from '../layout/Layout'
// render different layouts based on the component layout proeprty 
const LayoutSelector = (props) => {
  switch(props.children.type.layout) {
    case 'admin':
      return <AdminLayout>{props.children}</AdminLayout>
    case 'default':
      return <Layout>{props.children}</Layout>
  }
}
export default LayoutSelector