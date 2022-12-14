// True, if task status is matched with filter and false, if task status is not matched
export const checkSelection = function (
  selectedFilter: string,
  taskStatus: boolean
) {
  return (
    selectedFilter === "filter-all" ||
    (selectedFilter === "filter-active" && !taskStatus) ||
    (selectedFilter === "filter-completed" && taskStatus)
  );
};
