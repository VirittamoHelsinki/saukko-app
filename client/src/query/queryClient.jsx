import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchAllEvaluations } from '../api/evaluation'

const { data: evaluations, isLoading } = useQuery({
  queryKey: ["evaluations"],
  queryFn: fetchAllEvaluations,
});
