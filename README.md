# User Authentication Component
This is a user account authentication package for Node.js.

## Usage

This package is designed to manage data based on standard database management needs known by the acronym CRUD(Create, Read, Update, Delete. An additional verify parameter exist for user verification purposes.

### Authentication Object Parameters

These are the different properties that exist for the authentication object.

```
{
  id:        IdObject,
  email:     String,
  credential:{
    alias:   String,
    email:   String
  },
  service:{
    name:    String,
    code:    String
  },
  authorization:{
    user:    IdObject,
    service: IdObject,
    access:  IdObject
  },
  social:{ 
    user:    IdObject,
    service: IdObject,
    facebook:{
      id:    String,
      token: String
    },
    linkedin:{
      id:    String,
      token: String
    },
    gplus:{
      id:    String,
      token: String
    }
  }
}
```

### CREATE

When creating an account you are required to submit a object.  Object properties will determine what CREATE module to execute. 

New accounts require the `authorization` and `credential` properties.  If a user password is not created one will be self generated based on UUID Version 4 specifications and is only done when creating a new account based on the `social` property.

Updating service and social authorizations requires the exclusion of the `credential` property.  It must have a user identifier property `id` or `email` and with or without or in combination of the `authorization` and `social` property.

#### Response

On successful creation of an new user a object will be returned based on same request properties with database the associated `id: IdObject` properties. 

Expected error handling for duplicate key fields of the `credential` property.   This will return either `{type:'email_taken'}` or `{type:'alias_taken'}`. Exceptional error responses will be provided by the Mongoose package.

### READ



#### VERIFY(Extended READ functionality)



### UPDATE



### DELETE(Uses the variable name REMOVE instead of DETELE due to namespace.)


