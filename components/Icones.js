function Icone({ children, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconeSite = (p) => (
  <Icone {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </Icone>
);

export const IconeAlvo = (p) => (
  <Icone {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.5" />
  </Icone>
);

export const IconeIdiomas = (p) => (
  <Icone {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
  </Icone>
);

export const IconeBusca = (p) => (
  <Icone {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </Icone>
);

export const IconeEditar = (p) => (
  <Icone {...p}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" />
    <path d="m13.5 6.5 4 4" />
  </Icone>
);

export const IconeConversa = (p) => (
  <Icone {...p}>
    <path d="M20 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-4.2A8 8 0 1 1 20 11.5z" />
    <path d="M9 10.5h6M9 13.5h4" />
  </Icone>
);

export const IconeCheck = (p) => (
  <Icone {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icone>
);

export const IconeSeta = (p) => (
  <Icone {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icone>
);

export const IconeMenu = (p) => (
  <Icone {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icone>
);

export const IconeFechar = (p) => (
  <Icone {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icone>
);
