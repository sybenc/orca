import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Wrapper from './components/Wrapper.tsx'
import { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuList, AppStore, AppDispatch } from './store'
import Error404 from './pages/error/404'
import Error500 from './pages/error/500'
import Layout from './layout/Layout.tsx'

const modules = import.meta.glob('./pages/**/index.tsx')

function getComponent(path: string) {
  const componentPath = `./pages${path}/index.tsx`
  const module = modules[componentPath]
  if (module) {
    return lazy(module as never)
  } else {
    console.warn(`Module not found: ${componentPath}`)
    return null
  }
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { menuList } = useSelector((state: AppStore) => state.menu)

  useEffect(() => {
    dispatch(getMenuList())
  }, [dispatch])

  return (
    <Wrapper>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {
                menuList.map((item) => {
                  if (item.route) {
                    const Component = getComponent(item.component!)
                    if (!Component) return null
                    return (
                      <Route
                        key={item.menuId}
                        path={item.route}
                        element={<Component />}
                      />
                    )
                  }
                })
              }
              <Route key={404} path="/404" element={<Error404 />} />
              <Route key={500} path="/500" element={<Error500 />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </Wrapper>
  )
}

export default App
