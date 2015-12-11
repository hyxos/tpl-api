# TLP-API
Public facing API for the Toronto Public Library
## Installation
TODO: Describe the installation process
## Usage

### Request
`/books?title=standard`
### Response
``` javascript
  {
  "_id": "566b1471975054750e2cecd0",
  "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3351424&R=3351424",
  "title": "standard candles",
  "author": "major, alice, 949- author.",
  "pages": "164",
  "isbn": "9781772120912 (paperback)",
  "image": "http://syndetics.com/index.aspx?isbn=9781772120912/MC.gif",
  "id": "3351424",
  "copies": "2",
  "__v": 0,
  "branches": [
    {
      "name": "North York Central Library",
      "status": "In Transit"
    },
    {
      "name": "Toronto Reference Library",
      "status": "In Transit"
    }
  ]
}
```




## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History
TODO: Write history
## Credits
TODO: Write credits
## License
TODO: Write license
