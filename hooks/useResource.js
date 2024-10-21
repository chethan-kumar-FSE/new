'use client';
import React, { useState } from 'react';

function useResource(fetchFn) {
  const [data, setData] = useState(null); // Set default data to null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (body) => {
    setIsLoading(true);
    setError(null); // Clear any existing errors
    try {
      const response = await fetchFn(body);
      setData(response);
      return response; // Return the response immediately for chaining
    } catch (err) {
      setError(err); // Set error if caught
      throw err; // Throw error to handle in consuming code
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
}

export default useResource;
