React Native vCards - [vCards JS](https://github.com/enesser/vCards-js) for use with React Native
=====

[![Build Status](https://travis-ci.org/enesser/vCards-js.svg?branch=master)](https://travis-ci.org/enesser/vCards-js.svg?branch=master)

Updated for newer versions of react-native-fs. Now listed as a peerDependency.

Create vCards to import contacts into Outlook, iOS, Mac OS, and Android devices from your website or application.

![Screenshot](https://cloud.githubusercontent.com/assets/5659221/5240131/f99c1f3e-78c1-11e4-83b1-4f6e70eecf65.png)

## Install
Note that this package requires [react-native-fs](https://github.com/johanneslumpe/react-native-fs) for saving files.
If you have installed [rnpm](https://github.com/rnpm/rnpm), the easy way to install react-native-fs is the following:
```sh
npm install react-native-fs && rnpm link react-native-fs
```
Then to install this package, run the following:
```sh
npm install react-native-vcards@https://github.com/idxbroker/react-native-vcards.git --save
```

## Usage

Below is a simple example of how to create a basic vCard and how to save it to a file, or view its contents from the console.

### Basic vCard

```js
import vCard from 'react-native-vcards';

//create a new vCard
contact = vCard();

//set properties
contact.firstName = 'Eric';
contact.middleName = 'J';
contact.lastName = 'Nesser';
contact.organization = 'ACME Corporation';
contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
contact.workPhone = '312-555-1212';
contact.birthday = new Date('01-01-1985');
contact.title = 'Software Developer';
contact.url = 'https://github.com/enesser';
contact.note = 'Notes on Eric';

//save to file
contact.saveToFile('./eric-nesser.vcf');

//get as formatted string
console.log(contact.getFormattedString());

```

### Embedding Images

You can embed images in the photo or logo field instead of linking to them from a URL using base64 encoding.

```js
//can be Windows or Linux/Unix path structures, and JPEG, PNG, GIF formats
contact.photo.embedFromFile('/path/to/file.png');
contact.logo.embedFromFile('/path/to/file.png');
```

### Complete Example

The following shows a vCard with everything filled out.

```js
import vCard from 'react-native-vcards';

//create a new vCard
contact = vCard();

//set basic properties shown before
contact.firstName = 'Eric';
contact.middleName = 'J';
contact.lastName = 'Nesser';
contact.organization = 'ACME Corporation';

//link to image
contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');

//or embed image
contact.photo.attachFromUrl('/path/to/file.jpeg');

contact.workPhone = '312-555-1212';
contact.birthday = new Date('01-01-1985');
contact.title = 'Software Developer';
contact.url = 'https://github.com/enesser';
contact.workUrl = 'https://acme-corporation/enesser';
contact.note = 'Notes on Eric';

//set other vitals
contact.nickname = 'Scarface';
contact.namePrefix = 'Mr.';
contact.nameSuffix = 'JR';
contact.gender = 'M';
contact.anniversary = new Date('01-01-2004');
contact.role = 'Software Development';

//set other phone numbers
contact.homePhone = '312-555-1313';
contact.cellPhone = '312-555-1414';
contact.pagerPhone = '312-555-1515';

// set fax/ facsimile numbers
contact.homeFax = '312-555-1616';
contact.workFax = '312-555-1717';

// set email addresses
contact.email = 'e.nesser@emailhost.tld';
contact.workEmail = 'e.nesser@acme-corporation.tld';

//set logo of organization or personal logo (also supports embedding, see above)
contact.logo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');

//set URL where the vCard can be found
contact.source = 'http://mywebpage/myvcard.vcf';

//set address information
contact.homeAddress.label = 'Home Address';
contact.homeAddress.street = '123 Main Street';
contact.homeAddress.city = 'Chicago';
contact.homeAddress.stateProvince = 'IL';
contact.homeAddress.postalCode = '12345';
contact.homeAddress.countryRegion = 'United States of America';

contact.workAddress.label = 'Work Address';
contact.workAddress.street = '123 Corporate Loop\nSuite 500';
contact.workAddress.city = 'Los Angeles';
contact.workAddress.stateProvince = 'CA';
contact.workAddress.postalCode = '54321';
contact.workAddress.countryRegion = 'United States of America';

//set social media URLs
contact.socialUrls['facebook'] = 'https://...';
contact.socialUrls['linkedIn'] = 'https://...';
contact.socialUrls['twitter'] = 'https://...';
contact.socialUrls['flickr'] = 'https://...';
contact.socialUrls['custom'] = 'https://...';

//you can also embed photos from files instead of attaching via URL
contact.photo.embedFromFile('photo.jpg');
contact.logo.embedFromFile('logo.jpg');

contact.version = '3.0'; //can also support 2.1 and 4.0, certain versions only support certain fields

//save to file
const documentPath = rnfs.DocumentDirectoryPath;
contact.saveToFile(`${documentPath}/eric-nesser.vcf`);

//get as formatted string
console.log(contact.getFormattedString());
```

### Contributions

Contributions are always welcome!

Thanks to [mplno](https://github.com/mplno), [lop-cz](https://github.com/lop-cz), [jkrenge](https://github.com/jkrenge).

### License
Copyright (c) 2014-2015 Eric J Nesser MIT
