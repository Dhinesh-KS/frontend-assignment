import React, { useCallback, useEffect, useState } from "react";
import Table from "../../components/Table";
import styles from "./styles.module.css";
import { api } from "../../services";
import { TABLE_CONFIG } from "./utils";

const LoadingSpinner = (): JSX.Element => (
  <div className={styles.loadingContainer} data-testid="loading-spinner">
    <div className={styles.spinner}></div>
  </div>
);

const ErrorMessage = ({ message }: any): JSX.Element => (
  <div className={styles.errorContainer} data-testid="error-state">
    Error: {message}
  </div>
);

const ProjectInsights: React.FC = () => {
  const [projects, setProjects] = useState([]);
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

  const renderTableRow = useCallback(
    (project: any, index: number): JSX.Element => (
      <tr key={index} className={styles.tableRow}>
        <td className={styles.tableCell}>{index + 1}</td>
        <td className={styles.tableCell}>{project["percentage.funded"]}</td>
        <td className={styles.tableCell}>{project["amt.pledged"]}</td>
      </tr>
    ),
    []
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Kickstarter Projects</h1>

        <Table
          headers={TABLE_CONFIG.HEADERS}
          data={projects}
          initialItemsPerPage={10}
          renderRow={renderTableRow}
        />
      </div>
    </div>
  );
};

export default ProjectInsights;
