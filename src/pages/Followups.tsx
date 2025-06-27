import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import Papa from 'papaparse';

export default function Followups() {
  const { state } = useCRM();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('All');
  const [dateType, setDateType] = useState<'on' | 'after' | 'before' | 'between'>('on');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Show all leads in followups, not just followup records
  const allLeads = state.leads || [];

  // Only show leads with a follow-up status
  const followUpStatuses = ['Followup', 'Follow-Up', 'Follow up', 'Follow Up'];
  const followUpLeads = allLeads.filter(
    lead => followUpStatuses.includes(lead.status)
  );

  // Unique statuses and countries for dropdowns
  const statusOptions = ['All', ...Array.from(new Set(followUpLeads.map(l => l.status).filter(Boolean)))];
  const countryOptions = ['All', ...Array.from(new Set(followUpLeads.map(l => l.country).filter(Boolean)))];

  // Filtered follow-up leads
  const filteredFollowUpLeads = followUpLeads.filter(lead => {
    const term = searchTerm.trim().toLowerCase();
    const matchesCountry = countryFilter === 'All' || lead.country === countryFilter;
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSearch =
      !term ||
      (lead.fullName && lead.fullName.toLowerCase().includes(term)) ||
      (lead.email && lead.email.toLowerCase().includes(term)) ||
      (lead.phone && lead.phone.toLowerCase().includes(term)) ||
      (lead.status && lead.status.toLowerCase().includes(term));
    let matchesDate = true;
    if (dateType === 'on' && dateStart) {
      matchesDate = lead.updatedAt && lead.updatedAt.slice(0, 10) === dateStart;
    } else if (dateType === 'after' && dateStart) {
      matchesDate = lead.updatedAt && lead.updatedAt.slice(0, 10) > dateStart;
    } else if (dateType === 'before' && dateStart) {
      matchesDate = lead.updatedAt && lead.updatedAt.slice(0, 10) < dateStart;
    } else if (dateType === 'between' && dateStart && dateEnd) {
      matchesDate =
        lead.updatedAt &&
        lead.updatedAt.slice(0, 10) >= dateStart &&
        lead.updatedAt.slice(0, 10) <= dateEnd;
    }
    return matchesCountry && matchesStatus && matchesDate && matchesSearch;
  });

  // Export filtered follow-up leads as CSV
  const handleExport = () => {
    const exportData = filteredFollowUpLeads.map(lead => ({
      Name: lead.fullName,
      Status: lead.status,
      Phone: lead.phone,
      Country: lead.country,
      Qualification: lead.qualification,
      Source: lead.source,
      'Assigned To': (state.users.find(u => u.id === lead.assignedTo)?.name) || 'Unknown',
      'Created At': lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '',
      'Updated At': lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : '',
      Notes: lead.notes || ''
    }));
    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `followups_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {statusOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={countryFilter}
          onChange={e => setCountryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {countryOptions.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={dateType}
          onChange={e => setDateType(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="on">Updated On</option>
          <option value="after">After</option>
          <option value="before">Before</option>
          <option value="between">Between</option>
        </select>
        {(dateType === 'on' || dateType === 'after' || dateType === 'before') && (
          <input
            type="date"
            value={dateStart}
            onChange={e => setDateStart(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        )}
        {dateType === 'between' && (
          <>
            <input
              type="date"
              value={dateStart}
              onChange={e => setDateStart(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={dateEnd}
              onChange={e => setDateEnd(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
              placeholder="End Date"
            />
          </>
        )}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleExport}
        >
          Export CSV
        </button>
      </div>
      <div>
        {filteredFollowUpLeads.length === 0 ? (
          <div className="text-gray-500">No follow-up leads found.</div>
        ) : (
          <ul>
            {filteredFollowUpLeads.map(lead => (
              <li key={lead.id} className="border-b py-2">
                <div><b>Name:</b> {lead.fullName}</div>
                <div><b>Status:</b> {lead.status}</div>
                <div><b>Phone:</b> {lead.phone}</div>
                <div><b>Country:</b> {lead.country}</div>
                <div><b>Qualification:</b> {lead.qualification}</div>
                <div><b>Source:</b> {lead.source}</div>
                <div><b>Assigned To:</b> {(state.users.find(u => u.id === lead.assignedTo)?.name) || 'Unknown'}</div>
                <div><b>Created At:</b> {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ''}</div>
                <div><b>Updated At:</b> {lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : ''}</div>
                <div><b>Notes:</b> {lead.notes || ''}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}