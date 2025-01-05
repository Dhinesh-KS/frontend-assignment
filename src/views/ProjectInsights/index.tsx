import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../components/Table";
import styles from "./styles.module.css";
import { api } from "../../services";
import { TABLE_CONFIG } from "./utils";

const LoadingSpinner = (): JSX.Element => (
  <div className={styles.loadingContainer}>
    <div className={styles.spinner}></div>
  </div>
);

const ErrorMessage = ({ message }: any): JSX.Element => (
  <div className={styles.errorContainer}>Error: {message}</div>
);

const ProjectInsights: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await api.fetchProjects();
        console.log(data);
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        // setTimeout -> just added for demo purpose
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  const paginatedData = useMemo(() => {
    const indexOfLastProject = currentPage * TABLE_CONFIG.ITEMS_PER_PAGE;
    const indexOfFirstProject =
      indexOfLastProject - TABLE_CONFIG.ITEMS_PER_PAGE;

    return {
      currentProjects: projects.slice(indexOfFirstProject, indexOfLastProject),
      totalPages: Math.ceil(projects.length / TABLE_CONFIG.ITEMS_PER_PAGE),
    };
  }, [projects, currentPage]);

  const { currentProjects, totalPages } = paginatedData;

  const renderTableRow = useCallback(
    (project: any, index: number): JSX.Element => (
      <tr key={index} className={styles.tableRow}>
        <td className={styles.tableCell}>
          {(currentPage - 1) * TABLE_CONFIG.ITEMS_PER_PAGE + index + 1}
        </td>
        <td className={styles.tableCell}>{project["percentage.funded"]}</td>
        <td className={styles.tableCell}>${project["amt.pledged"]}</td>
      </tr>
    ),
    [currentPage]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Kickstarter Projects</h1>

        <Table
          headers={TABLE_CONFIG.HEADERS}
          data={currentProjects}
          currentPage={currentPage}
          totalPages={totalPages}
          renderRow={renderTableRow}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProjectInsights;
