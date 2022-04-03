import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface Record {
  social_id: string;
  social_link: string;
}
const getRecords = () =>
  axios.get("http://localhost:3030/socials").then((res) => res.data);

const getSingleRecords = (id: string) =>
  axios.get(`http://localhost:3030/socials/${id}`).then((res) => res.data);

const createNewRecord = (values: Record) =>
  axios.post("http://localhost:3030/socials", values).then((res) => res.data);

const updateRecord = ({ id, values }: { id: string; values: Record }) =>
  axios
    .put(`http://localhost:3030/socials/${id}`, values)
    .then((res) => res.data);

const RemoveRecord = (id: string) =>
  axios.delete(`http://localhost:3030/socials/${id}`).then((res) => res.data);

export const useGetRecords = () =>
  useQuery("records", getRecords, {
    refetchInterval: false,
  });

export const useGetSingleRecords = (id: string) =>
  useQuery(["record", id], () => getSingleRecords(id), {
    refetchInterval: false,
    enabled: !!id,
  });

export const useCreateNewRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewRecord, {
    onSuccess: () => {
      queryClient.refetchQueries("records");
    },
  });
};

export const useUpdateRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRecord, {
    onSuccess: () => {
      queryClient.refetchQueries("records");
    },
  });
};
export const useRemoveRecord = () => {
  const queryClient = useQueryClient();
  return useMutation(RemoveRecord, {
    onSuccess: () => {
      queryClient.refetchQueries("records");
    },
  });
};
