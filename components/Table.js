import classes from "./Table.module.css";

const Table = ({ header, body }) => {
  return (
    <div className={classes.tables}>
      {header && (
        <div className={classes.headerTable}>
          <table>
            <thead>{header}</thead>
          </table>
        </div>
      )}
      <div className={classes.bodyTable}>
        <table>
          <tbody>{body}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
