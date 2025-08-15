import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      if (!isLoggedIn) {
        Swal.fire({
            title: 'akses ditolak',
            text: 'Silahkan login terlebih dahulu',
            icon: 'warning',
            confirmButtonText: 'Oke', 
        }).then(() => {
            router.replace('/auth')
        });
    }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
