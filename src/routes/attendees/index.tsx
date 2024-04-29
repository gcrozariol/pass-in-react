import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'

import { IconButton } from './components/icon-button'

import { Table } from './components/table/table'
import { TableRow } from './components/table/table-row'
import { TableCell } from './components/table/table-cell'
import { TableHeader } from './components/table/table-header'

dayjs.extend(relativeTime)

interface Attendees {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function Attendees() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }

    return ''
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendees[]>([])

  useEffect(() => {
    const url = new URL(
      'http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
    )

    url.searchParams.set('pageIndex', `${page - 1}`)

    if (search.length > 0) {
      url.searchParams.set('query', search)
    }

    fetch(url)
      .then((res) => res.json())
      .then(
        ({ attendees, total }: { attendees: Attendees[]; total: number }) => {
          setAttendees(attendees)
          setTotal(total)
        },
      )
  }, [page, search])

  const totalPages = Math.ceil(total / 10)

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url)

    setPage(page)
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('search', search)
    window.history.pushState({}, '', url)

    setSearch(search)
  }

  function onSearchChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToNextPage() {
    setCurrentPage(page + 1)
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Attendee List</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Find attendee..."
            onChange={onSearchChanged}
            value={search}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 focus:ring-0"
              />
            </TableHeader>
            <TableHeader>Code</TableHeader>
            <TableHeader>Attendee</TableHeader>
            <TableHeader>Enrollment date</TableHeader>
            <TableHeader>Check-in date</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>

        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id} className=" hover:bg-white/5">
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10 focus:ring-0"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell className="w-[440px]">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span>{attendee.email.toLocaleLowerCase()}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt ? (
                    dayjs().to(attendee.checkedInAt)
                  ) : (
                    <span className="text-zinc-400">
                      Haven&apos;t checked in yet
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>

        <tfoot>
          <tr>
            <TableCell className="py-3 px-4 text-sm text-zinc-300" colSpan={3}>
              Showing {attendees.length} of {total} items
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
