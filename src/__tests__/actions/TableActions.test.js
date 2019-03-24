import * as actions from '../../actions/TableActions';

describe('Table Actions', () => {
    //CALCULATE ROWS
    it('should return no rows when none are present', () => {
        const given = {
            state: {
                rows: [],
                pagination: {
                    currentPage: 1,
                    rowSize: 5,
                }
            }
        };
        const expected = [];

        expect(actions.calculateRows(given)).toEqual(expected);
    });

    it('should return the first 5 rows', () => {
        const given = {
            state: {
                rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
                pagination: {
                    currentPage: 1,
                    rowSize: 5,
                }
            }
        };
        const expected = [1, 2, 3, 4, 5];

        expect(actions.calculateRows(given)).toEqual(expected);
    });

    it('should return the second 5 rows', () => {
        const given = {
            state: {
                rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
                pagination: {
                    currentPage: 2,
                    rowSize: 5,
                }
            }
        };
        const expected = [6, 7, 8, 9, 10];

        expect(actions.calculateRows(given)).toEqual(expected);
    });

    it('should return the last 4 rows', () => {
        const given = {
            state: {
                rows: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ],
                pagination: {
                    currentPage: 3,
                    rowSize: 5,
                }
            }
        };
        const expected = [11, 12, 13, 14];

        expect(actions.calculateRows(given)).toEqual(expected);
    });
    //SORT COLUMN
    it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
        const given = {
            column: 'firstName',
            state: {
                sort: {
                    direction: 'none',
                    column: 'firstName',
                },
                rows: [
                    { firstName: 'Paul', email: 'p@gmail.com' },
                    { firstName: 'Adam', email: 'd@gmail.com' },
                    { firstName: 'Matt', email: 'm@gmail.com' },
                    { firstName: 'Matt', email: 'a@gmail.com' },
                ],
                columns: [
                    { accessor: 'firstName', },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sort: {
                direction: 'ascending',
                column: 'firstName',
            },
            rows: [
                { firstName: 'Adam', email: 'd@gmail.com' },
                { firstName: 'Matt', email: 'm@gmail.com' },
                { firstName: 'Matt', email: 'a@gmail.com' },
                { firstName: 'Paul', email: 'p@gmail.com' },
            ],
            columns: [
                { accessor: 'firstName', },
                { accessor: 'email', },
            ],
        };

        expect(actions.sortColumn(given)).toEqual(expected);
    });
    //CHANGE SORT FIELD AND DIRECTION
    it('should return ascending if the new column matches the old column and there was no previous sort direction', () => {
        const given = {
            newColumn: 'firstName',
            state: {
                sort: {
                    direction: 'none',
                    column: 'firstName',
                }
            }
        };
        const expected = {
            sortedColumn: 'firstName',
            sortedDirection: 'ascending'
        };

        expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    });

    it('should return descending if the new column matches the old column and there was the previous sort direction was ascending', () => {
        const given = {
            newColumn: 'firstName',
            state: {
                sort: {
                    direction: 'ascending',
                    column: 'firstName',
                }
            }
        };
        const expected = {
            sortedColumn: 'firstName',
            sortedDirection: 'descending'
        };

        expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    });

    it('should return ascending if the new column matches the old column and there was the previous sort direction was descending', () => {
        const given = {
            newColumn: 'firstName',
            state: {
                sort: {
                    direction: 'descending',
                    column: 'firstName',
                }
            }
        };
        const expected = {
            sortedColumn: 'firstName',
            sortedDirection: 'ascending',
        };

        expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    });

    it('should return none if the new column matches the old column and there was the previous sort direction was not defined', () => {
        const given = {
            newColumn: 'firstName',
            state: {
                sort: {
                    direction: 'EyeOfTheTiger',
                    column: 'firstName',
                }
            }
        };
        const expected = {
            sortedColumn: 'firstName',
            sortedDirection: 'none'
        };

        expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    });

    it('should return ascending if the new column does not match the old column', () => {
        const given = {
            newColumn: 'firstName',
            state: {
                sort: {
                    direction: 'ascending',
                    column: 'email',
                }
            }
        };
        const expected = {
            sortedColumn: 'firstName',
            sortedDirection: 'ascending'
        };

        expect(actions.changeSortFieldAndDirection(given)).toEqual(expected);
    });
    //CHANGE ROW ORDER
    it('should return the rows listed in ascending order based on the column clicked', () => {
        const given = {
            column: 'firstName',
            state: {
                rows: [
                    { firstName: 'Paul', email: 'p@gmail.com' },
                    { firstName: 'Adam', email: 'd@gmail.com' },
                    { firstName: 'Matt', email: 'm@gmail.com' },
                    { firstName: 'Matt', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'ascending',
                },
                columns: [
                    { accessor: 'firstName', },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { firstName: 'Adam', email: 'd@gmail.com' },
                { firstName: 'Matt', email: 'm@gmail.com' },
                { firstName: 'Matt', email: 'a@gmail.com' },
                { firstName: 'Paul', email: 'p@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should return the rows listed in descending order based on the column clicked', () => {
        const given = {
            column: 'firstName',
            state: {
                rows: [
                    { firstName: 'Paul', email: 'p@gmail.com' },
                    { firstName: 'Adam', email: 'd@gmail.com' },
                    { firstName: 'Matt', email: 'm@gmail.com' },
                    { firstName: 'Matt', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'descending',
                },
                columns: [
                    { accessor: 'firstName', },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { firstName: 'Paul', email: 'p@gmail.com' },
                { firstName: 'Matt', email: 'a@gmail.com' },
                { firstName: 'Matt', email: 'm@gmail.com' },
                { firstName: 'Adam', email: 'd@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should return the rows listed in ascending order based on the column clicked if direction is not one of the described states', () => {
        const given = {
            column: 'firstName',
            state: {
                rows: [
                    { firstName: 'Paul', email: 'p@gmail.com' },
                    { firstName: 'Adam', email: 'd@gmail.com' },
                    { firstName: 'Matt', email: 'm@gmail.com' },
                    { firstName: 'Matt', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'IAmALittleTeaPot',
                },
                columns: [
                    { accessor: 'firstName', },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { firstName: 'Adam', email: 'd@gmail.com' },
                { firstName: 'Matt', email: 'm@gmail.com' },
                { firstName: 'Matt', email: 'a@gmail.com' },
                { firstName: 'Paul', email: 'p@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should return the rows listed in the same order if it is not sure of how to sort the columns', () => {
        const given = {
            column: 'IAmALittleTeaPot',
            state: {
                rows: [
                    { firstName: 'Paul', email: 'p@gmail.com' },
                    { firstName: 'Adam', email: 'd@gmail.com' },
                    { firstName: 'Matt', email: 'm@gmail.com' },
                    { firstName: 'Matt', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'ascending',
                },
                columns: [
                    { accessor: 'firstName', },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { firstName: 'Paul', email: 'p@gmail.com' },
                { firstName: 'Adam', email: 'd@gmail.com' },
                { firstName: 'Matt', email: 'm@gmail.com' },
                { firstName: 'Matt', email: 'a@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should order dates from newest to oldest', () => {
        const given = {
            column: 'date',
            state: {
                rows: [
                    { date: '12/30/2016', email: 'p@gmail.com' },
                    { date: '01/01/2017', email: 'd@gmail.com' },
                    { date: '12/31/2016', email: 'm@gmail.com' },
                    { date: '01/01/2016', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'ascending',
                },
                columns: [
                    { accessor: 'date', sortType: 'date' },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { date: '01/01/2017', email: 'd@gmail.com' },
                { date: '12/31/2016', email: 'm@gmail.com' },
                { date: '12/30/2016', email: 'p@gmail.com' },
                { date: '01/01/2016', email: 'a@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should order dates from oldest to newest', () => {
        const given = {
            column: 'date',
            state: {
                rows: [
                    { date: '12/30/2016', email: 'p@gmail.com' },
                    { date: '01/01/2017', email: 'd@gmail.com' },
                    { date: '12/31/2016', email: 'm@gmail.com' },
                    { date: '01/01/2016', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'descending',
                },
                columns: [
                    { accessor: 'date', sortType: 'date' },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { date: '01/01/2016', email: 'a@gmail.com' },
                { date: '12/30/2016', email: 'p@gmail.com' },
                { date: '12/31/2016', email: 'm@gmail.com' },
                { date: '01/01/2017', email: 'd@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    it('should order dates from oldest to newest and handle the same date', () => {
        const given = {
            column: 'date',
            state: {
                rows: [
                    { date: '12/30/2016', email: 'p@gmail.com' },
                    { date: '01/01/2017', email: 'd@gmail.com' },
                    { date: '12/30/2016', email: 'm@gmail.com' },
                    { date: '01/01/2016', email: 'a@gmail.com' },
                ],
                sort: {
                    direction: 'descending',
                },
                columns: [
                    { accessor: 'date', sortType: 'date' },
                    { accessor: 'email', },
                ],
            }
        };
        const expected = {
            sortedRows: [
                { date: '01/01/2016', email: 'a@gmail.com' },
                { date: '12/30/2016', email: 'm@gmail.com' },
                { date: '12/30/2016', email: 'p@gmail.com' },
                { date: '01/01/2017', email: 'd@gmail.com' },
            ]
        };

        expect(actions.changeRowOrder(given)).toEqual(expected);
    });

    //Pagination
    it('should update the currentPage to the next page', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 2,
                    rowSize: 15,
                },
            }
        };
        const expected = {
            pagination: {
                currentPage: 3,
                inputtedPage: 3,
                rowSize: 15,
            },
        };

        expect(actions.nextPage(given)).toEqual(expected);
    });

    it('should update the currentPage to the previous page', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 2,
                    rowSize: 15,
                },
            }
        };
        const expected = {
            pagination: {
                currentPage: 1,
                inputtedPage: 1,
                rowSize: 15,
            },
        };

        expect(actions.previousPage(given)).toEqual(expected);
    });

    it('should decide when shouldCall is true to call setPage', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 31,
                    inputtedPage: 31,
                    totalPages: 150,
                },
            },
            newPage: "33",
            shouldCall: true,
        };
        const expected = {
            pagination: {
                currentPage: "33",
                inputtedPage: "33",
                totalPages: 150,
            },
        };

        expect(actions.goToPage(given)).toEqual(expected);
    });

    it('should decide when shouldCall is false to call setInputtedPage', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 31,
                    inputtedPage: 31,
                    totalPages: 150,
                },
            },
            newPage: "33",
            shouldCall: false,
        };
        const expected = {
            pagination: {
                currentPage: 31,
                inputtedPage: "33",
                totalPages: 150,
            },
        };

        expect(actions.goToPage(given)).toEqual(expected);
    });


    it('should test the states pagination currentPage and inputtedPage to be set to the new page value', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 31,
                    inputtedPage: 31,
                    totalPages: 150,
                },
            },
            newPage: "33",
            shouldCall: true,
        };
        const expected = {
            pagination: {
                currentPage: "33",
                inputtedPage: "33",
                totalPages: 150,
            },
        };

        expect(actions.setCurrentPage(given)).toEqual(expected);
    });

    it('should test the states pagination inputtedPage to be set to the new page value', () => {
        const given = {
            state: {
                pagination: {
                    currentPage: 31,
                    inputtedPage: 31,
                    totalPages: 150,
                },
            },
            newPage: "33",
            shouldCall: false,
        };
        const expected = {
            pagination: {
                currentPage: 31,
                inputtedPage: "33",
                totalPages: 150,
            },
        };

        expect(actions.setInputtedPage(given)).toEqual(expected);
    });

    it('should test not a number and receive the currentPage number back', () => {
        const given = {
            newPage: "Not A Number!",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = 31;

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test the "0" being entered and receive the currentPage number back when should call is true', () => {
        const given = {
            newPage: "0",
            currentPage: 31,
            totalPages: 150,
            shouldCall: true,
        };
        const expected = 31;

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test the "0" being entered and receive the "0" back when should call is false', () => {
        const given = {
            newPage: "0",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = "0";

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test if the new page is below zero and return back to the first page', () => {
        const given = {
            newPage: "-2",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = 1;

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test if the new page is greater than the total pages and return back to the last page', () => {
        const given = {
            newPage: "234",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = 150;

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test if the new page is empty and if enter was clicked and return back to the current page', () => {
        const given = {
            newPage: "",
            currentPage: 31,
            totalPages: 150,
            shouldCall: true,
        };
        const expected = 31;

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test if the new page is empty and if enter was not clicked and return back an empty string', () => {
        const given = {
            newPage: "",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = "";

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should test if the new page is 54 and return 54 back as the page to go to', () => {
        const given = {
            newPage: "54",
            currentPage: 31,
            totalPages: 150,
            shouldCall: false,
        };
        const expected = "54";

        expect(actions.checkPageState(given)).toBe(expected);
    });

    it('should call the event pagination event listener', () => {
        const paginationEventListener = jest.fn();
        const given = {
            state: {
                pagination: {
                    currentPage: 2,
                    inputtedPage: 2,
                    rowSize: 15,
                },
                paginationEventListener,
            },
            currentPage: 3,
        };
        const expected = {
            pagination: {
                currentPage: 3,
                inputtedPage: 3,
                rowSize: 15,
            },
        };

        actions.changePage(given);
        expect(paginationEventListener).toHaveBeenCalledWith(expected);
    });

    //EXPAND OR HIDE ROW
    it('should hide a shown row', () => {
        const given = {
            rowIndex: 1,
            state: {
                pagination: {
                    currentPage: 1,
                    rowSize: 15,
                },
                rows: [
                    { isOpen: false, firstName: 'Paul', },
                    { isOpen: true, firstName: 'Matt', },
                    { isOpen: false, firstName: 'Michelle', },
                ],
            }
        };
        const expected = {
            pagination: {
                currentPage: 1,
                rowSize: 15,
            },
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: false, firstName: 'Matt', },
                { isOpen: false, firstName: 'Michelle', },
            ],
        };

        expect(actions.expandRow(given)).toEqual(expected);
    });

    it('should show a hidden row', () => {
        const given = {
            rowIndex: 2,
            state: {
                pagination: {
                    currentPage: 1,
                    rowSize: 15,
                },
                rows: [
                    { isOpen: false, firstName: 'Paul', },
                    { isOpen: true, firstName: 'Matt', },
                    { isOpen: false, firstName: 'Michelle', },
                ],
            }
        };
        const expected = {
            pagination: {
                currentPage: 1,
                rowSize: 15,
            },
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: true, firstName: 'Michelle', },
            ],
        };

        expect(actions.expandRow(given)).toEqual(expected);
    });

    it('should show a hidden row on a different page', () => {
        const given = {
            rowIndex: 0,
            state: {
                pagination: {
                    currentPage: 2,
                    rowSize: 5,
                },
                rows: [
                    { isOpen: false, firstName: 'Paul', },
                    { isOpen: true, firstName: 'Matt', },
                    { isOpen: false, firstName: 'Michelle', },
                    { isOpen: false, firstName: 'Walter', },
                    { isOpen: true, firstName: 'Tony', },
                    { isOpen: false, firstName: 'Tina', },
                ],
            }
        };
        const expected = {
            pagination: {
                currentPage: 2,
                rowSize: 5,
            },
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: false, firstName: 'Michelle', },
                { isOpen: false, firstName: 'Walter', },
                { isOpen: true, firstName: 'Tony', },
                { isOpen: true, firstName: 'Tina', },
            ],
        };

        expect(actions.expandRow(given)).toEqual(expected);
    });

    it('should show a hidden row when using server pagination', () => {
        const given = {
            rowIndex: 2,
            state: {
                pagination: {
                    currentPage: 1,
                    rowSize: 15,
                    isServerPagination: true,
                },
                rows: [
                    { isOpen: false, firstName: 'Paul', },
                    { isOpen: true, firstName: 'Matt', },
                    { isOpen: false, firstName: 'Michelle', },
                ],
            }
        };
        const expected = {
            pagination: {
                currentPage: 1,
                rowSize: 15,
                isServerPagination: true,
            },
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: true, firstName: 'Michelle', },
            ],
        };
        expect(actions.expandRow(given)).toEqual(expected);
    });

    it('should hide a shown row when using server pagination', () => {
        const given = {
            rowIndex: 2,
            state: {
                pagination: {
                    currentPage: 1,
                    rowSize: 15,
                    isServerPagination: true,
                },
                rows: [
                    { isOpen: false, firstName: 'Paul', },
                    { isOpen: true, firstName: 'Matt', },
                    { isOpen: true, firstName: 'Michelle', },
                ],
            }
        };
        const expected = {
            pagination: {
                currentPage: 1,
                rowSize: 15,
                isServerPagination: true,
            },
            rows: [
                { isOpen: false, firstName: 'Paul', },
                { isOpen: true, firstName: 'Matt', },
                { isOpen: false, firstName: 'Michelle', },
            ],
        };
        expect(actions.expandRow(given)).toEqual(expected);
    });
});
