const Pagination = ({ perPage, total, paginate }) => {

    const pageNums = [];
    for (let i = 1; i <= Math.ceil(total/perPage); i++){
        pageNums.push(i);
    }

    return (
        <div className="container">
            <ul className="pagination">
                { 
                    pageNums.map(num => {
                        return (
                            <li key={num} className="page-item">
                                <a onClick={() => paginate(event, num)} href="#" className="page-link">
                                    { num }
                                </a>
                            </li>
                        )
                    })
                }
            </ul>

            <style jsx>{`

            .container {
                margin-top: 20px;
                max-width: 600px;
            }

            .pagination {
                box-shadow: 0 0 0 1px rgba(0,0,0,.1), 0 2px 4px 1px rgba(0,0,0,.4);
                border-radius: 5px;
            }

            .page-item{
                display: inline-block;
                margin: 0 5px;
            }

            .page-link {
                display: block;
                text-decoration: none;
                color: black;
                padding: 20px;
                box-size: border-box;
                position: relative;
            }

            .page-link:focus{
                border-bottom: 5px solid rgb(22,50,92);
            }

            `}</style>
        </div>
    );
}

export default Pagination;
