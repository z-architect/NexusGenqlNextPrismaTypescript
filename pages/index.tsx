import type { NextPage } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { client } from '../util/genqlClient';


import styles from '../styles/Home.module.css'
const Home: NextPage = () => {
  const fetcher = () =>
    client.query({
      getItems: [{
        sortBy: "asc"
      }, {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        createdAt: true
      }]
    })
  const { data, error } = useSWR('getItems', fetcher)
  return (
    <div className={styles.container} >
      <div className={styles?.nav}>
        <div>
          MoviesHub
        </div>
        <Link href="/create">
          <a className="btn">Create Item &#8594;</a>
        </Link>
      </div>
      {
        error && <p>Oops, something went wrong!</p>
      }
      <div className={styles.sitescontainer}>
        {
          data?.getItems && data.getItems.map((item) => (
            <div className={styles.sites} key={item.id}>
              <Link href={`/item/${item.id}`}>
                <a>
                  {item.imageUrl ?
                    <img src={item.imageUrl} height="520" width="410" /> :
                    <img src="https://user-images.githubusercontent.com/33921841/132140321-01c18680-e304-4069-a0f0-b81a9f6d5cc9.png" height="640" width="480" />
                  }
                  <h2>{item.title}</h2>
                  <p>{item.description ? item?.description : "No description available"}</p>
                  <p>Created At: {new Date(item?.createdAt).toDateString()}</p>
                </a>
              </Link>
            </div >
          ))
        }
      </div>
    </div>
  )
}

export default Home
