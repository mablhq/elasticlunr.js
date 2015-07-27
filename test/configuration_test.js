module('elasticlunr.Configuration');

test('constructor test', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"title": {"boost": 2}},"bool": "OR"}';

  var target = {
    title: {
      boost: 2,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('constructor test 2', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"title": {"boost": 3},"body": {"boost": 2}},"bool": "OR"}';

  var target = {
    title: {
      boost: 3,
      bool: "OR",
      expand: true
    },
    body: {
      boost: 2,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct without user config', function () {
  var fields = ['title', 'body'],
      userConfig = null;

  var target = {
    title: {
      boost: 1,
      bool: "OR",
      expand: true
    },
    body: {
      boost: 1,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config for bool and expand, but no field configured', function () {
  var fields = ['title', 'body'],
      userConfig = '{"bool": "OR", "expand": false}';

  var target = {
    title: {
      boost: 1,
      bool: "OR",
      expand: false
    },
    body: {
      boost: 1,
      bool: "OR",
      expand: false
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config for bool and expand overwrited by field config', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"title": {"boost": 3, "bool": "AND"},"body": {"boost": 2}},"bool": "OR"}';

  var target = {
    title: {
      boost: 3,
      bool: "AND",
      expand: true
    },
    body: {
      boost: 2,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config without field boost', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"title": {"bool": "AND"},"body": {}},"bool": "OR"}';

  var target = {
    title: {
      boost: 1,
      bool: "AND",
      expand: true
    },
    body: {
      boost: 1,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config without bool and expand setting', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"title": {"boost": 2},"body": {}}}';

  var target = {
    title: {
      boost: 2,
      bool: "OR",
      expand: true
    },
    body: {
      boost: 1,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config, search field not in idx._fields', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields": {"head": {"boost": 3, "bool": "AND"},"body": {"boost": 2}},"bool": "OR"}';

  var target = {
    body: {
      boost: 2,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});

test('construct with user config, search fields is null', function () {
  var fields = null,
      userConfig = '{"fields": {"head": {"boost": 3, "bool": "AND"},"body": {"boost": 2}},"bool": "OR"}';

  throws(function () {
    var config = new elasticlunr.Configuration(userConfig, fields);
  });
});

test('construct with user config, json parse failed', function () {
  var fields = ['title', 'body'],
      userConfig = '{"fields: {"head": {"boost": 3, "bool": "AND"},"body": {"boost": 2}},"bool": "OR"}';

  var target = {
    title: {
      boost: 1,
      bool: "OR",
      expand: true
    },
    body: {
      boost: 1,
      bool: "OR",
      expand: true
    }
  };

  var config = new elasticlunr.Configuration(userConfig, fields);
  deepEqual(config.get(), target);
});
