/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('pets');



db.getCollection('dog_pics').createIndex(
  {
    description: 'text' // Creates a text index on the 'description' field
  },
  {
    name: 'facts' // Optional: Specifies a name for the index
  }
);
