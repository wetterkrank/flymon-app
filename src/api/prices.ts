export interface IFlightPrice {
  flyFrom: string;
  flyTo: string;
  price: number;
}

export const getPrices = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<IFlightPrice|null>>
): Promise<void> => {
  try {
    const response = await fetch("http://192.168.1.128:3000/api/prices");
    const json = await response.json();
    setData(json.data[0]);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
