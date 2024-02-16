// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>
//         <%= pagetitle %>
//     </title>
//     <!-- Bootstrap CSS -->
//     <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
//     <!-- Custom CSS -->
    


//     <link rel="stylesheet" href="styles.css">
// </head>

// <body>
//     <header class="bg-primary py-3">
//         <div class="container text-center">
//             <h1 class="text-light">EXPENSE TRACKER</h1>
//         </div>
//     </header>
//     <nav>
//         <a href="/basis" id="downloadExpenses" class="btn btn-success btn-sm float-right mt-3">Download Expenses</a>
//     </nav>
//     <div class="container my-4">
//         <div class="row">
//             <div class="col-md-6 mx-auto">
//                 <form id="expenseForm" action="/addexpense" method="post">
//                     <div class="form-group">
//                         <label for="amount">Amount</label>
//                         <input type="number" class="form-control" name="amount" id="amount">
//                     </div>
//                     <div class="form-group">
//                         <label for="description">Description</label>
//                         <input type="text" class="form-control" name="description" id="description">
//                     </div>
//                     <div class="form-group">
//                         <label for="category">Category</label>
//                         <select class="form-control" name="category" id="category">
//                             <option value="food">Food</option>
//                             <option value="petrol">Petrol</option>
//                             <option value="bills">Bills</option>
//                         </select>
//                     </div>
                    
//                     <button type="submit" class="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         </div>
//         <br>
//         <select id="pageLimitSelector" class="form-control mb-3">
//             <option value="3" <%= pagination.pageLimit === 3 ? 'selected' : '' %>>3 per page</option>
//             <option value="6" <%= pagination.pageLimit === 6 ? 'selected' : '' %>>6 per page</option>
//             <option value="10" <%= pagination.pageLimit === 10 ? 'selected' : '' %>>10 per page</option>
//         </select>
        



//         <!-- Display expenses -->
//         <div id="expensesContainer" class="row mt-4">
//             <% if(expenses && expenses.length> 0) { %>
//                 <% expenses.forEach(function(exp) { %>
//                     <div class="col-md-4 mx-auto">
//                         <div class="card mb-3">
//                             <div class="card-body">
//                                 <h5 class="card-title">Amount: <%= exp.amount %>
//                                 </h5>
//                                 <p class="card-text">Description: <%= exp.description %>
//                                 </p>
//                                 <p class="card-text">Category: <%= exp.category %>
//                                 </p>
//                                 <a href="/expense/edit/<%= exp.id %>" class="btn btn-sm btn-primary">Edit</a>
//                                 <form action="/expense/delete" method="post" style="display: inline;">
//                                     <input type="hidden" name="expenseid" value="<%= exp.id %>">
//                                     <button type="submit" class="btn btn-sm btn-danger">Delete</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                     <% }); %>
//                         <% } else { %>
//                             <div class="col-md-6 mx-auto">
//                                 <p>No expenses found.</p>
//                             </div>
//                             <% } %>
//         </div>

//         <!-- Pagination -->
//         <nav aria-label="Page navigation">
//             <ul class="pagination justify-content-center">
//                 <% if (pagination.prevPage) { %>
//                     <li class="page-item">
//                         <a class="page-link" href="<%= pagination.prevPage %>" aria-label="Previous">
//                             <span aria-hidden="true">&laquo;</span>
//                             <span class="sr-only">Previous</span>
//                         </a>
//                     </li>
//                     <% } %>

//                         <% for (let i=1; i <=pagination.pageCount; i++) { %>
//                             <li class="page-item <% if (i === pagination.currentPage) { %> active <% } %>">
//                                 <a class="page-link"
//                                     href="<%= pagination.baseUrl %>?limit=<%= pagination.pageLimit %>&page=<%= i %>">
//                                     <%= i %>
//                                 </a>
//                             </li>
//                             <% } %>

//                                 <% if (pagination.nextPage) { %>
//                                     <li class="page-item">
//                                         <a class="page-link" href="<%= pagination.nextPage %>" aria-label="Next">
//                                             <span aria-hidden="true">&raquo;</span>
//                                             <span class="sr-only">Next</span>
//                                         </a>
//                                     </li>
//                                     <% } %>

//             </ul>
//         </nav>
//     </div>

//     <!-- Pagination -->


//     <script>
//         const currentPage = '<%= pagination.currentPage %>';
    
//         document.getElementById('pageLimitSelector').addEventListener('change', function() {
//             const selectedPageLimit = this.value;
//             const baseUrl = '<%= pagination.baseUrl %>'; // Get the base URL from EJS
//             const url = `${baseUrl}?limit=${selectedPageLimit}&page=${currentPage}`;
    
//             // Redirect to the new URL with the selected page limit
//             window.location.href = url;
//         });
//     </script>
    



    

// </body>

// </html>

// exports.getpostexpense = async (req, res, next) => {
//     try {
//         console.log("USERID>>>>>IN GET EXPENSE", req.user.id);

//         const expenses = await Expensive.findAll({ where: { signupId: req.user.id } });
//         console.log("length>>>>", expenses.length);

//         // Set the default page limit and current page
//         const defaultPageLimit = 4;
//         const currentPage = req.query.page ? parseInt(req.query.page) : 1;

//         // Get the page limit from the request query, or use the default if not provided
//         const pageLimit = req.query.limit ? parseInt(req.query.limit) : defaultPageLimit;
        
//         // Calculate the start and end index of expenses based on the current page and page limit
//         const startIndex = (currentPage - 1) * pageLimit;
//         const endIndex = Math.min(startIndex + pageLimit - 1, expenses.length - 1);
        
//         // Slice the expenses array based on the calculated start and end index
//         const paginatedExpenses = expenses.slice(startIndex, endIndex + 1);

//         // Calculate the total number of pages needed for pagination
//         const pageCount = Math.ceil(expenses.length / pageLimit);
        
//         // Create an array of page numbers for pagination links
//         const paginationArray = Array.from({ length: pageCount }, (_, i) => i + 1);

//         // Calculate the previous and next page URLs
//         const prevPage = currentPage > 1 ? `${req.baseUrl}?limit=${pageLimit}&page=${currentPage - 1}` : false;
//         const nextPage = currentPage < pageCount ? `${req.baseUrl}?limit=${pageLimit}&page=${currentPage + 1}` : false;

//         // Prepare the view data to pass to the EJS template
//         const viewdata = {
//             pagetitle: 'Expenses-List',
//             expenses: paginatedExpenses,
//             expenseCount: expenses.length,
//             pagination: {
//                 pageLimit,
//                 currentPage,
//                 pageCount,
//                 paginationArray,
//                 prevPage,
//                 nextPage,
//                 baseUrl: req.baseUrl
//             }
//         };

//         console.log("PAGINATION ARRAY", paginationArray);

//         res.render('Expensive/getexpensive', viewdata);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//     }
// };
