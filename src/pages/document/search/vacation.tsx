// react
import { useEffect } from 'react';

// next
import { useRouter } from 'next/router';

// daisyui
import {} from 'react-daisyui';

// hooks

export default function VacationDetail() {
  // router
  const router = useRouter();

  // useEffect
  useEffect(() => {
    const { id } = router.query;

    console.log(id);
  }, []);

  return <div>vacation detail</div>;
}
