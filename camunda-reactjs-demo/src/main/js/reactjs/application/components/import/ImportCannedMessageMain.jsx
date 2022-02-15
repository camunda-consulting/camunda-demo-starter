const React = require('react');

const ImportCannedMessageForm = require('src/main/js/reactjs/renewals/components/import/ImportCannedMessageForm.jsx');

class ImportCannedMessageMain extends React.Component{

  render(){
      return (
        <div>
          <h4>Your CSV Should be formatted like the following example. * designates required field</h4>
          <div>
              <table>
                  <thead>
                    <tr>
                      <th>subject *</th>
                      <th>text *</th>
                      <th>html</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>This is a message subject</td>
                      <td>This is a message body</td>
                      <td>This is some html</td>
                     </tr>
                      
                  </tbody>
              </table>
          </div>
          <ImportCannedMessageForm />
        </div>
      )
  }
}

module.exports = ImportCannedMessageMain;
