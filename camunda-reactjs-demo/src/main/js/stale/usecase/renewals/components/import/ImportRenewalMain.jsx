const React = require('react');

const ImportRenewalForm = require('src/main/js/reactjs/renewals/components/import/ImportRenewalForm.jsx');

class ImportRenewalMain extends React.Component{

  render(){
      return (
        <div>
          <h4>Your CSV Should be formatted like the following example. * designates required field.</h4>
          <div>
              <table>
                  <thead>
                    <tr>
                      <th>start</th>
                      <th>end *</th>
                      <th>propertySlug *</th>
                      <th>currentRent</th>
                      <th>oneYearOffer</th>
                      <th>twoYearOffer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/15/2016</td>
                      <td>11/15/2017</td>
                      <td>1180 Atlantis Ave Lafayette Colorado CO 80026</td>
                      <td>2200.00</td>
                      <td>1200</td>
                      <td>2400</td>
                     </tr>
                     <tr>
                      <td>11/15/2016</td>
                      <td>11/15/2017</td>
                      <td>1180 Atlantis Ave 3A Lafayette Colorado CO 80026</td>
                      <td>2200.00</td>
                      <td>2400.00</td>
                      <td>2400</td>
                     </tr>
                  </tbody>
              </table>
          </div>
          <ImportRenewalForm />
        </div>
      )
  }
}

module.exports = ImportRenewalMain;
