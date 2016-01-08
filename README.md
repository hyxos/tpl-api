# TLP-API
Public facing API for the Toronto Public Library
## Demo
TPL-API Search https://1hx.ca/tplapi
## Installation
TODO: Describe the installation process
## Usage

### Options

| param 	| example  	|
|---	 |---	|
| `order`  	| `asc (default: -1)`    	|
| `limit`  	| `number value (defualt: 10)` 	|

### Sample Request
`books?title=c&order=asc&limit=3`

#### Response
``` javascript
[
    {
        "_id": "566b14de975054750e2cefd7",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3356028&R=3356028",
        "title": "1960s counterculture : documents decoded",
        "author": "willis, jim, 946 march 19- author",
        "pages": "231",
        "isbn": "9781610695220 (hardcover)",
        "image": "http://syndetics.com/index.aspx?isbn=9781610695220/MC.gif",
        "id": "3356028",
        "copies": "2",
        "__v": 0,
        "branches": [
            {
                "name": "North York Central Library",
                "status": "In Library"
            },
            {
                "name": "Toronto Reference Library",
                "status": "In Library"
            }
        ]
    },
    {
        "_id": "566b14c8975054750e2cef2d",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3360512&R=3360512",
        "title": "3d fashion design : technique, design and visualization",
        "author": "makryniotis, thomas, author.",
        "pages": "176",
        "isbn": "18499429359781849942935",
        "image": "http://syndetics.com/index.aspx?isbn=1849942935/MC.gif",
        "id": "3360512",
        "copies": "7",
        "__v": 0,
        "branches": []
    },
    {
        "_id": "566b14da975054750e2cefb3",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3305932&R=3305932",
        "title": "3d printing & cnc fabrication with sketchup",
        "author": "cline, lydia sloan, author.",
        "pages": "224",
        "isbn": "9780071842419",
        "image": "http://syndetics.com/index.aspx?isbn=9780071842419/MC.gif",
        "id": "3305932",
        "copies": "12",
        "__v": 0,
        "branches": [
            {
                "name": "Don Mills",
                "status": "In Library"
            },
            {
                "name": "Downsview",
                "status": "In Library"
            },
            {
                "name": "Fairview",
                "status": "In Library"
            },
            {
                "name": "Fort York",
                "status": "In Library"
            },
            {
                "name": "Locke",
                "status": "In Library"
            },
            {
                "name": "Malvern",
                "status": "In Library"
            },
            {
                "name": "North York Central Library",
                "status": "In Library"
            },
            {
                "name": "Parkdale",
                "status": "In Library"
            },
            {
                "name": "Richview",
                "status": "In Library"
            },
            {
                "name": "Scarborough Civic Centre",
                "status": "In Library"
            },
            {
                "name": "Toronto Reference Library",
                "status": "In Library"
            },
            {
                "name": "York Woods",
                "status": "In Library"
            }
        ]
    }
]
```

#### Another Request
`/books?title=c&author=willis&order=asc&limit=3`

#### Response
``` javascript
[
    {
        "_id": "566b14de975054750e2cefd7",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3356028&R=3356028",
        "title": "1960s counterculture : documents decoded",
        "author": "willis, jim, 946 march 19- author",
        "pages": "231",
        "isbn": "9781610695220 (hardcover)",
        "image": "http://syndetics.com/index.aspx?isbn=9781610695220/MC.gif",
        "id": "3356028",
        "copies": "2",
        "__v": 0,
        "branches": [
            {
                "name": "North York Central Library",
                "status": "In Library"
            },
            {
                "name": "Toronto Reference Library",
                "status": "In Library"
            }
        ]
    },
    {
        "_id": "566b1491975054750e2cedcb",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3358650&R=3358650",
        "title": "plants : from roots to riches",
        "author": "willis, k. j., author.",
        "pages": "354",
        "isbn": "1444798235 (hardback)9781444798234 (hardback)",
        "image": "http://syndetics.com/index.aspx?isbn=1444798235/MC.gif",
        "id": "3358650",
        "copies": "5",
        "__v": 0,
        "branches": [
            {
                "name": "Fairview",
                "status": "In Transit"
            },
            {
                "name": "High Park",
                "status": "In Transit"
            },
            {
                "name": "Leaside",
                "status": "In Transit"
            },
            {
                "name": "Locke",
                "status": "In Transit"
            },
            {
                "name": "Port Union",
                "status": "In Transit"
            }
        ]
    },
    {
        "_id": "566b14ad975054750e2ceeb4",
        "uri": "http://www.torontopubliclibrary.ca/detail.jsp?Entt=RDM3360569&R=3360569",
        "title": "sunlight & shadows in watercolour",
        "author": "willis, lucy, author.",
        "pages": "125",
        "isbn": "9781849942645",
        "image": "http://syndetics.com/index.aspx?isbn=9781849942645/MC.gif",
        "id": "3360569",
        "copies": "6",
        "__v": 0,
        "branches": [
            {
                "name": "Bayview",
                "status": "In Transit"
            },
            {
                "name": "Brentwood",
                "status": "In Transit"
            },
            {
                "name": "Cliffcrest",
                "status": "In Transit"
            },
            {
                "name": "Riverdale",
                "status": "In Transit"
            },
            {
                "name": "Scarborough Civic Centre",
                "status": "In Transit"
            },
            {
                "name": "St. James Town",
                "status": "In Transit"
            }
        ]
    }
]
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
