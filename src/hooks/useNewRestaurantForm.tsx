import React, {useCallback} from 'react';
import {ServerError} from '../api';

type UseNewRestaurantFormHook = {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export function useNewRestaurantForm({
  handler,
  setValidationError,
  setServerError,
}: {
  handler: (s: string) => Promise<unknown>;
  setValidationError: (b: boolean) => void;
  setServerError: (b: boolean) => void;
}): UseNewRestaurantFormHook {
  const handleFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setServerError(false);
      setValidationError(false);
      try {
        const restaurantName = getFormData(event, 'restaurantName');
        await handler(restaurantName);
        resetForm(event);
      } catch (error) {
        if (error instanceof ServerError) {
          setServerError(true);
        } else {
          setValidationError(true);
        }
      }
    },
    [handler],
  );

  return {handleFormSubmit};
}

function getFormData(
  event: React.FormEvent<HTMLFormElement>,
  elementName: string,
): string {
  const formData = new FormData(event.currentTarget);
  const value = formData.get(elementName);
  assertIsNonEmptyString(value);
  return value;
}

function assertIsNonEmptyString(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('value is either empty or not a valid string');
  }
}

function resetForm(event: React.FormEvent<HTMLFormElement>): void {
  (event.target as HTMLFormElement).reset();
}
