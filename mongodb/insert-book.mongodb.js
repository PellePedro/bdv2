use('bookstore');

// Define the book to insert or update
const book = {
  id: "book123",  // You can change this to test different scenarios
  name: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  description: "A novel about the American Dream",
  price: 55.99,
  image: "https://example.com/great-gatsby.jpg"
};

// Function to upsert a book
function upsertBook(book) {
    // Check if a book with the same name and author already exists
    const existingBook = db.books.findOne({ name: book.name, author: book.author });
  
    if (existingBook) {
      // If the book exists, update it using its existing ID
      const updateResult = db.books.updateOne(
        { _id: existingBook._id },
        { 
          $set: {
            name: book.name,
            author: book.author,
            description: book.description,
            price: book.price,
            image: book.image
          },
          $setOnInsert: { id: existingBook.id }
        },
        { upsert: true }
      );
      
      print(`Book updated. Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`);
    } else {
      // If the book doesn't exist, insert it
      const insertResult = db.books.insertOne(book);
      print(`New book inserted with ID: ${insertResult.insertedId}`);
    }
  }

// Call the upsert function
upsertBook(book);

// Find and display all books in the collection
const allBooks = db.books.find().toArray();
print('All books in the collection:');
printjson(allBooks);