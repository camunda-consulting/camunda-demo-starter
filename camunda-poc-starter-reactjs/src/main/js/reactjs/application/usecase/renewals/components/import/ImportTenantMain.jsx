const React = require('react');

const ImportTenantForm = require('src/main/js/reactjs/renewals/components/import/ImportTenantForm.jsx');

class ImportTenantMain extends React.Component{

  render(){
      return (
        <div>
          <h4>Your CSV Should be formatted like the following example. * designates required field</h4>
          <div>
              <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>email *</th>
                      <th>propertySlug *</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Paul Lungu</td>
                      <td>lungu77@gmail.com</td>
                      <td>1180 Atlantis Ave Lafayette Colorado CO 80026</td>
                     </tr>
                      <tr>
                      <td>Paul Lungu</td>
                      <td>paul@symathia.com</td>
                      <td>1188 Atlantis Ave Lafayette Colorado CO 80026</td>
                     </tr>
                  </tbody>
              </table>
          </div>
          <ImportTenantForm />
        </div>
      )
  }
}

module.exports = ImportTenantMain;
