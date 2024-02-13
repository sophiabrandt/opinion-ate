import React, {useCallback} from 'react';

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
        resetForm(event);
        await submitRestaurant(restaurantName, handler);
      } catch (error) {
        setValidationError(true);
        if (error instanceof ServerError) {
          setServerError(true);
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
    throw new Error('value is not a non-empty string');
  }
}

function resetForm(event: React.FormEvent<HTMLFormElement>): void {
  event.currentTarget.reset();
}

async function submitRestaurant(
  restaurantName: string,
  handler: (s: string) => Promise<unknown>,
): Promise<void> {
  try {
    await handler(restaurantName.trim());
  } catch (error) {
    throw new ServerError('Failed to submit restaurant name');
  }
}

class ServerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerError';
  }
}
