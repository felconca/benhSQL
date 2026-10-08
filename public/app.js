const KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "NOT",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "OUTER",
  "ON",
  "GROUP",
  "BY",
  "ORDER",
  "LIMIT",
  "OFFSET",
  "AS",
  "DISTINCT",
  "COUNT",
  "SUM",
  "AVG",
  "MIN",
  "MAX",
  "CREATE",
  "TABLE",
  "ALTER",
  "DROP",
  "IN",
  "IS",
  "NULL",
  "LIKE",
  "BETWEEN",
  "HAVING",
  "UNION",
  "ALL",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "DESC",
  "ASC",
  "EXISTS",
];

/* =========================================================================
   ICONS — small inline SVG set (Lucide-style: 24x24, stroke-based) used
   everywhere instead of emoji, for dynamically generated markup. Static
   buttons in the HTML above inline their own <svg> directly.
   ========================================================================= */
const ICONS = {
  chevronDown: '<polyline points="6 9 12 15 18 9"/>',
  chevronRight: '<polyline points="9 18 15 12 9 6"/>',
  chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  table: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M12 3v18"/>',
  server:
    '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01"/><path d="M6 17h.01"/>',
  inbox:
    '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z"/>',
  filePlus:
    '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',
  loader:
    '<path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  diamond: '<path d="M12 2 2 12l10 10 10-10Z"/>',
  key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l1.8-1.8a1 1 0 0 0 0-1.4L18.7 4.3a1 1 0 0 0-1.4 0l-1.8 1.8a1 1 0 0 0 0 1.4Z"/><path d="m11.5 11.5-3-3"/><path d="m3 21 3.5-3.5"/><path d="m14 8-8 8"/><circle cx="5" cy="19" r="2"/>',
  link: '<path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/>',
  keyword: '<path d="M21 6H3"/><path d="M15 12H3"/><path d="M17 18H3"/>',
  // Brand marks for connection types, drawn in the same stroke-based style
  // as the rest of the icon set so they sit naturally in the schema tree.
  mysqlLogo:
    '<path d="M8.785,6.865a3.055,3.055,0,0,0-.785.1V7h.038a6.461,6.461,0,0,0,.612.785c.154.306.288.611.441.917.019-.019.038-.039.038-.039a1.074,1.074,0,0,0,.4-.957,4.314,4.314,0,0,1-.23-.4c-.115-.191-.364-.287-.517-.44" style="fill:#5d87a1;fill-rule:evenodd"/><path d="M27.78,23.553a8.849,8.849,0,0,0-3.712.536c-.287.115-.745.115-.785.478.154.153.172.4.307.613a4.467,4.467,0,0,0,.995,1.167c.4.306.8.611,1.225.879.745.461,1.588.728,2.314,1.187.422.268.842.612,1.264.9.21.153.343.4.611.5v-.058a3.844,3.844,0,0,0-.291-.613c-.191-.19-.383-.363-.575-.554a9.118,9.118,0,0,0-1.99-1.932c-.613-.422-1.953-1-2.2-1.7l-.039-.039a7.69,7.69,0,0,0,1.321-.308c.65-.172,1.243-.133,1.912-.3.307-.077.862-.268.862-.268v-.3c-.342-.34-.587-.795-.947-1.116a25.338,25.338,0,0,0-3.122-2.328c-.587-.379-1.344-.623-1.969-.946-.226-.114-.6-.17-.737-.36a7.594,7.594,0,0,1-.776-1.457c-.548-1.04-1.079-2.193-1.551-3.293a20.236,20.236,0,0,0-.965-2.157A19.078,19.078,0,0,0,11.609,5a9.07,9.07,0,0,0-2.421-.776c-.474-.02-.946-.057-1.419-.075A7.55,7.55,0,0,1,6.9,3.485C5.818,2.8,3.038,1.328,2.242,3.277,1.732,4.508,3,5.718,3.435,6.343A8.866,8.866,0,0,1,4.4,7.762c.133.322.171.663.3,1A22.556,22.556,0,0,0,5.687,11.3a8.946,8.946,0,0,0,.7,1.172c.153.209.417.3.474.645a5.421,5.421,0,0,0-.436,1.419,8.336,8.336,0,0,0,.549,6.358c.3.473,1.022,1.514,1.987,1.116.851-.34.662-1.419.908-2.364.056-.229.019-.379.132-.53V19.3s.483,1.061.723,1.6a10.813,10.813,0,0,0,2.4,2.59A3.514,3.514,0,0,1,14,24.657V25h.427A1.054,1.054,0,0,0,14,24.212a9.4,9.4,0,0,1-.959-1.16,24.992,24.992,0,0,1-2.064-3.519c-.3-.6-.553-1.258-.793-1.857-.11-.231-.11-.58-.295-.7a7.266,7.266,0,0,0-.884,1.313,11.419,11.419,0,0,0-.517,2.921c-.073.02-.037,0-.073.038-.589-.155-.792-.792-1.014-1.332a8.756,8.756,0,0,1-.166-5.164c.128-.405.683-1.681.461-2.068-.111-.369-.48-.58-.682-.871a7.767,7.767,0,0,1-.663-1.237C5.912,9.5,5.69,8.3,5.212,7.216a10.4,10.4,0,0,0-.921-1.489A9.586,9.586,0,0,1,3.276,4.22c-.092-.213-.221-.561-.074-.793a.3.3,0,0,1,.259-.252c.238-.212.921.058,1.16.174a9.2,9.2,0,0,1,1.824.967c.258.194.866.685.866.685h.18c.612.133,1.3.037,1.876.21a12.247,12.247,0,0,1,2.755,1.32,16.981,16.981,0,0,1,5.969,6.545c.23.439.327.842.537,1.3.4.94.9,1.9,1.3,2.814a12.578,12.578,0,0,0,1.36,2.564c.286.4,1.435.612,1.952.822a13.7,13.7,0,0,1,1.32.535c.651.4,1.3.861,1.913,1.3.305.23,1.262.708,1.32,1.091" style="fill:#00758f;fill-rule:evenodd"/>',
  postgresLogo:
    '<path d="M24.295 9.929c-0.010 0.155-0.082 0.292-0.191 0.387l-0.001 0.001c-0.131 0.143-0.306 0.243-0.504 0.278l-0.005 0.001c-0.028 0.004-0.061 0.007-0.094 0.007h-0c-0.001 0-0.003 0-0.004 0-0.312 0-0.58-0.189-0.694-0.46l-0.002-0.005c-0.030-0.221 0.33-0.388 0.701-0.44s0.764 0.011 0.794 0.231zM14.385 10.443c-0.121 0.311-0.418 0.528-0.766 0.528-0.004 0-0.007-0-0.011-0h0.001c-0 0-0 0-0 0-0.036 0-0.070-0.003-0.105-0.007l0.004 0c-0.261-0.047-0.483-0.191-0.63-0.392l-0.002-0.003c-0.082-0.094-0.132-0.219-0.132-0.354 0-0 0-0.001 0-0.001v0c0.012-0.077 0.055-0.143 0.115-0.185l0.001-0.001c0.152-0.084 0.334-0.133 0.528-0.133 0.083 0 0.164 0.009 0.242 0.026l-0.007-0.001c0.395 0.055 0.803 0.242 0.764 0.523zM25.403 18.086l-0.107-0.134-0.044-0.055c0.457-0.846 0.725-1.853 0.725-2.921 0-0.488-0.056-0.962-0.162-1.418l0.008 0.042c-0.070-0.453-0.111-0.976-0.111-1.508 0-0.007 0-0.014 0-0.021v0.001c0.023-0.501 0.076-0.97 0.158-1.429l-0.010 0.066c0.089-0.464 0.14-0.998 0.14-1.544 0-0.051-0-0.101-0.001-0.151l0 0.008c0.012-0.049 0.019-0.104 0.019-0.162 0-0.027-0.002-0.053-0.004-0.079l0 0.003c-0.4-1.58-1.151-2.949-2.168-4.073l0.007 0.008c-0.911-1.068-2.031-1.929-3.3-2.523l-0.060-0.025c0.696-0.149 1.496-0.234 2.316-0.234 0.075 0 0.15 0.001 0.225 0.002l-0.011-0c0.045-0.001 0.097-0.002 0.15-0.002 2.378 0 4.496 1.109 5.866 2.838l0.012 0.016c0.028 0.036 0.056 0.077 0.080 0.12l0.003 0.005c0.904 1.694-0.345 7.842-3.732 13.172zM25.117 9.322c-0.016 0.455-0.064 0.886-0.14 1.307l0.008-0.055c-0.078 0.425-0.134 0.931-0.157 1.445l-0.001 0.025c-0 0.017-0 0.036-0 0.056 0 0.567 0.042 1.124 0.124 1.668l-0.008-0.061c0.085 0.377 0.134 0.809 0.134 1.254 0 0.763-0.144 1.493-0.407 2.162l0.014-0.040c-0.076-0.131-0.155-0.289-0.224-0.453l-0.011-0.029c-0.066-0.159-0.209-0.416-0.406-0.77-0.769-1.38-2.571-4.611-1.649-5.929 0.474-0.678 1.676-0.707 2.722-0.579zM24.406 20.907c-0.051-1.039 0.336-1.148 0.746-1.263q0.085-0.023 0.169-0.051c0.050 0.044 0.105 0.087 0.162 0.125l0.005 0.003c0.62 0.273 1.342 0.431 2.102 0.431 0.592 0 1.161-0.096 1.693-0.274l-0.038 0.011c-0.344 0.293-0.736 0.544-1.16 0.738l-0.031 0.013c-0.644 0.264-1.391 0.429-2.173 0.454l-0.010 0c-0.119 0.018-0.256 0.029-0.395 0.029-0.386 0-0.754-0.080-1.087-0.224l0.018 0.007zM23.293 22.933c-0.021 0.221-0.045 0.47-0.077 0.745l-0.182 0.548c-0.014 0.040-0.022 0.086-0.023 0.134v0c0.001 0.027 0.001 0.058 0.001 0.089 0 0.355-0.053 0.699-0.151 1.022l0.006-0.025c-0.116 0.389-0.196 0.84-0.223 1.305l-0.001 0.016c-0.052 1.684-1.355 3.047-3.008 3.194l-0.013 0.001c-1.894 0.406-2.23-0.621-2.526-1.527q-0.045-0.142-0.096-0.283c-0.16-0.652-0.252-1.401-0.252-2.171 0-0.36 0.020-0.715 0.059-1.065l-0.004 0.043c0.006-0.128 0.009-0.279 0.009-0.43 0-1.026-0.154-2.016-0.441-2.948l0.019 0.071q0.008-0.55 0.024-1.114c0-0.003 0-0.008 0-0.012 0-0.046-0.007-0.090-0.020-0.132l0.001 0.003c-0.014-0.1-0.033-0.188-0.058-0.273l0.003 0.013c-0.141-0.521-0.496-0.941-0.964-1.164l-0.011-0.005c-0.176-0.088-0.384-0.14-0.605-0.14-0.104 0-0.205 0.011-0.302 0.033l0.009-0.002c0.128-0.47 0.26-0.854 0.412-1.228l-0.026 0.073 0.066-0.177c0.074-0.2 0.167-0.407 0.266-0.626 0.546-1.124 0.865-2.445 0.865-3.841 0-0.938-0.144-1.842-0.411-2.692l0.017 0.063c-0.183-1.108-1.135-1.943-2.281-1.943-0.18 0-0.356 0.021-0.524 0.060l0.016-0.003c-0.796 0.104-1.516 0.338-2.171 0.682l0.035-0.017q-0.124 0.063-0.245 0.13c0.091-2.147 0.896-4.090 2.181-5.615l-0.012 0.014c0.118-0.119 0.242-0.232 0.37-0.338l0.009-0.007c0.069-0.014 0.13-0.042 0.182-0.081l-0.001 0.001c0.893-0.654 2.014-1.047 3.227-1.047 0.097 0 0.193 0.002 0.288 0.007l-0.013-0.001c0.526 0.008 1.034 0.044 1.534 0.108l-0.067-0.007c2.043 0.393 3.787 1.463 5.032 2.963l0.011 0.014c0.748 0.869 1.354 1.887 1.766 2.998l0.022 0.069c-0.257-0.069-0.552-0.109-0.856-0.109-0.983 0-1.868 0.416-2.49 1.081l-0.002 0.002c-1.24 1.773 0.679 5.215 1.601 6.869 0.169 0.303 0.315 0.565 0.361 0.676 0.26 0.601 0.587 1.118 0.98 1.577l-0.007-0.008c0.087 0.109 0.171 0.214 0.236 0.306-0.501 0.144-1.401 0.478-1.319 2.146-0.015 0.195-0.053 0.558-0.104 1.018-0.054 0.269-0.098 0.597-0.123 0.93l-0.002 0.028zM14.091 17.219l-0.066 0.176c-0.137 0.328-0.279 0.745-0.397 1.172l-0.019 0.081c-0.893-0.013-1.695-0.395-2.261-1.001l-0.002-0.002c-0.632-0.667-1.020-1.57-1.020-2.564 0-0.198 0.015-0.392 0.045-0.582l-0.003 0.021c0.097-0.72 0.153-1.551 0.153-2.396 0-0.502-0.020-0.999-0.058-1.491l0.004 0.065c-0.006-0.107-0.012-0.201-0.015-0.275 0.805-0.611 1.824-0.98 2.929-0.98 0.132 0 0.262 0.005 0.391 0.015l-0.017-0.001c0.554 0.129 0.971 0.588 1.037 1.153l0.001 0.006c0.238 0.728 0.375 1.566 0.375 2.435 0 1.266-0.291 2.464-0.809 3.532l0.021-0.048c-0.105 0.233-0.204 0.453-0.289 0.682zM11.474 22.203c-0.205-0.052-0.385-0.128-0.549-0.227l0.009 0.005c0.172-0.073 0.375-0.134 0.585-0.173l0.019-0.003c1.604-0.33 1.851-0.563 2.392-1.25 0.124-0.157 0.264-0.336 0.459-0.553 0.040-0.045 0.072-0.099 0.091-0.159l0.001-0.003c0.213-0.189 0.34-0.137 0.546-0.052 0.227 0.125 0.395 0.336 0.46 0.587l0.001 0.007c0.023 0.065 0.037 0.139 0.037 0.217 0 0.125-0.035 0.242-0.095 0.341l0.002-0.003c-0.645 0.882-1.676 1.449-2.839 1.449-0.4 0-0.785-0.067-1.144-0.191l0.025 0.007zM3.967 15.846c-0.651-1.985-1.181-4.34-1.494-6.764l-0.021-0.199c-0.061-0.322-0.095-0.693-0.095-1.071 0-1.806 0.789-3.427 2.041-4.537l0.006-0.005c2.295-1.623 6.048-0.676 7.633-0.163l-0.012 0.012c-1.535 1.872-2.466 4.292-2.466 6.928 0 0.090 0.001 0.18 0.003 0.27l-0-0.013c-0 0.103 0.008 0.249 0.020 0.449 0.033 0.41 0.052 0.888 0.052 1.371 0 0.802-0.052 1.592-0.154 2.367l0.010-0.091c-0.033 0.206-0.051 0.444-0.051 0.686 0 1.231 0.482 2.35 1.269 3.177l-0.002-0.002q0.151 0.158 0.315 0.297c-0.433 0.464-1.375 1.49-2.377 2.696-0.709 0.853-1.199 0.689-1.36 0.636-0.685-0.368-1.222-0.939-1.538-1.631l-0.009-0.022c-0.684-1.252-1.286-2.708-1.73-4.232l-0.039-0.157zM30.445 19.403c-0.019-0.057-0.043-0.106-0.072-0.151l0.002 0.003c-0.174-0.329-0.596-0.427-1.259-0.29-2.066 0.426-2.866 0.164-3.156-0.024 1.617-2.452 2.918-5.292 3.751-8.326l0.049-0.209c0.339-1.313 0.997-4.403 0.153-5.913-0.059-0.112-0.122-0.208-0.192-0.298l0.003 0.004c-1.563-1.955-3.948-3.196-6.623-3.196-0.076 0-0.152 0.001-0.227 0.003l0.011-0c-0.042-0.001-0.091-0.001-0.141-0.001-1.342 0-2.633 0.22-3.838 0.625l0.085-0.025q-0.321-0.060-0.645-0.102c-0.488-0.093-1.053-0.151-1.631-0.16l-0.008-0c-0.083-0.004-0.18-0.006-0.278-0.006-1.315 0-2.538 0.394-3.557 1.071l0.024-0.015c-1.071-0.401-5.984-2.056-9.025 0.098-1.489 1.27-2.426 3.147-2.426 5.244 0 0.405 0.035 0.802 0.102 1.188l-0.006-0.041c0.335 2.698 0.879 5.126 1.632 7.461l-0.079-0.284c0.493 1.716 1.103 3.201 1.852 4.6l-0.061-0.124c0.433 0.984 1.182 1.764 2.116 2.225l0.026 0.012c0.168 0.049 0.361 0.078 0.561 0.078 0.742 0 1.392-0.391 1.756-0.979l0.005-0.009c1.001-1.204 1.987-2.282 2.43-2.758 0.502 0.279 1.097 0.451 1.731 0.471l0.006 0 0.001 0.005q-0.158 0.188-0.309 0.382c-0.424 0.538-0.512 0.649-1.875 0.93-0.388 0.080-1.418 0.292-1.433 1.014-0 0.004-0 0.008-0 0.013 0 0.147 0.043 0.284 0.117 0.399l-0.002-0.003c0.312 0.395 0.751 0.678 1.254 0.788l0.015 0.003c0.399 0.13 0.859 0.205 1.335 0.205 1.1 0 2.106-0.398 2.884-1.058l-0.006 0.005c-0.024 0.418-0.037 0.908-0.037 1.401 0 1.753 0.171 3.467 0.496 5.125l-0.027-0.167c0.382 1.373 1.616 2.367 3.084 2.38h0.002c0.369-0.003 0.726-0.046 1.070-0.124l-0.033 0.006c1.919-0.171 3.431-1.705 3.567-3.619l0.001-0.012c0.188-1.088 0.502-3.593 0.673-5.125 0.008-0.065 0.034-0.123 0.072-0.171l-0.001 0.001c0.001-0.001 0.087-0.059 0.534 0.038l0.055 0.009 0.317 0.028 0.019 0.001c0.095 0.004 0.207 0.007 0.319 0.007 1.024 0 2.002-0.2 2.895-0.564l-0.051 0.018c0.805-0.373 2.256-1.29 1.993-2.087z"></path>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m5.6 5.6 .7 .7"/><path d="m17.7 17.7 .7 .7"/><path d="m5.6 18.4 .7-.7"/><path d="m17.7 6.3 .7-.7"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1 -9 -9Z"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
  sparkles:
    '<path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7Z"/><path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8Z"/><path d="M19 13l.6 1.6L21.2 15l-1.6.6L19 17.2l-.6-1.6L16.8 15l1.6-.6Z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
};

function icon(name, size, extraClass) {
  const s = size || 14;
  const cls = extraClass ? ` ${extraClass}` : "";
  return `<svg class="icon${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}

// Returns the right brand mark for a connection type (dolphin for MySQL/
// MariaDB, elephant for PostgreSQL), falling back to a plain server glyph
// for anything unrecognized.
function dbLogo(type, size) {
  if (type === "postgres") return icon("postgresLogo", size);
  if (type === "mysql" || type === "mariadb") return icon("mysqlLogo", size);
  if (type === "sqlite") return icon("database", size);
  return icon("server", size);
}

/* =========================================================================
   API HELPERS
   ========================================================================= */
async function api(path, options) {
  const res = await fetch("/api" + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* empty body */
  }
  if (!res.ok) {
    const message = (body && (body.error || body.message)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return body;
}

/* =========================================================================
   STATE
   ========================================================================= */
let connections = [];
let tabs = [];
let activeTabId = null;
let history = [];
let tabSeq = 0;
let sessionTab = "chat";

function getActiveTab() {
  return tabs.find((t) => t.id === activeTabId) || null;
}

function makeBlankTab() {
  tabSeq++;
  return {
    id: "tab" + tabSeq,
    title: "Query " + tabSeq,
    connId: null,
    dbName: "",
    query: "SELECT *\nFROM your_table\nLIMIT 100;",
    result: null,
    view: "table",
    running: false,
    fileHandle: null, // FileSystemFileHandle when saved/opened via the native picker (Chromium only)
    boundFilename: null, // filename this tab is linked to, so Save doesn't re-prompt
    dirty: false, // true when the query has changed since the last save to boundFilename
    chatSessions: [], // this tab's own chat conversations — separate from every other tab's
    activeChatSessionId: null,
  };
}

function makeFilledTab(connId, dbName, query, title) {
  tabSeq++;
  return {
    id: "tab" + tabSeq,
    title: title || "Query " + tabSeq,
    connId: connId || null,
    dbName: dbName || "",
    query: query || "SELECT *\nFROM your_table\nLIMIT 100;",
    result: null,
    view: "table",
    running: false,
    fileHandle: null,
    boundFilename: null,
    dirty: false,
    chatSessions: [],
    activeChatSessionId: null,
  };
}

function openNewTab(tab) {
  tabs.push(tab);
  activeTabId = tab.id;
  renderTabs();
  refreshWorkbench();
  persistSession();
}

// Titles a result tab opened from a multi-statement run using the
// statement's own first line, so "Result 1"/"Result 2" isn't the only clue
// to which query produced which tab.
// Pulls the table name out of a FROM/INTO/UPDATE clause — handles aliases
// (FROM users u), schema-qualified names (schema.users, `schema`.`users`),
// and each of MySQL/Postgres/SQLite's own quoting styles. Not a real SQL
// parser, just enough pattern-matching to label a result tab meaningfully.
function extractTableNameFromSql(sql) {
  const idChain = '(?:[`"\\[]?\\w+[`"\\]]?\\.)*[`"\\[]?\\w+[`"\\]]?';
  const patterns = [
    new RegExp("\\bFROM\\s+(" + idChain + ")", "i"),
    new RegExp("\\bINTO\\s+(" + idChain + ")", "i"),
    new RegExp("\\bUPDATE\\s+(" + idChain + ")", "i"),
  ];
  for (const re of patterns) {
    const m = sql.match(re);
    if (m) {
      const cleaned = m[1].replace(/[`"[\]]/g, "");
      const parts = cleaned.split(".");
      return parts[parts.length - 1];
    }
  }
  return null;
}

function shortSqlTitle(sql, index) {
  const tableName = extractTableNameFromSql(sql);
  if (tableName) return tableName;
  const firstLine = (sql.split("\n")[0] || "").trim();
  if (!firstLine) return `Result ${index + 1}`;
  return firstLine.length > 30 ? firstLine.slice(0, 30) + "…" : firstLine;
}

/* =========================================================================
   AUTOSAVE (localStorage) — remembers open tabs (title, query, target,
   view, bound filename) across page reloads. A live fileHandle can't be
   serialized, so after a reload the app still remembers the filename but
   Save will re-prompt once to reacquire a handle (browser security limit).
   ========================================================================= */
const SESSION_KEY = "querybench.session.v1";
let persistTimer = null;

function persistSession() {
  try {
    const payload = {
      activeTabId,
      tabs: tabs.map((t) => ({
        id: t.id,
        title: t.title,
        connId: t.connId,
        dbName: t.dbName,
        query: t.query,
        view: t.view,
        boundFilename: t.boundFilename || null,
        chatSessions: t.chatSessions || [],
        activeChatSessionId: t.activeChatSessionId || null,
      })),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch (e) {
    /* storage unavailable/full — not critical, ignore */
  }
}

function schedulePersist() {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(persistSession, 400);
}

function restoreSession() {
  let raw;
  try {
    raw = localStorage.getItem(SESSION_KEY);
  } catch (e) {
    return false;
  }
  if (!raw) return false;
  try {
    const payload = JSON.parse(raw);
    if (!payload || !Array.isArray(payload.tabs) || payload.tabs.length === 0) return false;
    tabs = payload.tabs.map((t) => ({
      id: t.id,
      title: t.title || "Query",
      connId: t.connId || null,
      dbName: t.dbName || "",
      query: t.query || "",
      result: null,
      view: t.view === "json" ? "json" : "table",
      running: false,
      fileHandle: null,
      boundFilename: t.boundFilename || null,
      dirty: false,
      chatSessions: Array.isArray(t.chatSessions) ? t.chatSessions : [],
      activeChatSessionId: t.activeChatSessionId || null,
    }));
    tabs.forEach((t) => {
      const m = /^tab(\d+)$/.exec(t.id);
      if (m) tabSeq = Math.max(tabSeq, parseInt(m[1], 10));
      (t.chatSessions || []).forEach((s) => {
        const sm = /^chatsess(\d+)$/.exec(s.id || "");
        if (sm) chatSessionSeq = Math.max(chatSessionSeq, parseInt(sm[1], 10));
      });
    });
    activeTabId = tabs.some((t) => t.id === payload.activeTabId) ? payload.activeTabId : tabs[0].id;
    return true;
  } catch (e) {
    return false;
  }
}

/* =========================================================================
   RENDER: connection tree
   ========================================================================= */
function findConn(id) {
  return connections.find((c) => c.id === id);
}

function cssEscape(s) {
  return window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function highlightActiveTreeRow() {
  document.querySelectorAll(".tree-row.is-active").forEach((el) => el.classList.remove("is-active"));
  const tab = getActiveTab();
  if (!tab || !tab.connId) return;
  const connEl = document.querySelector(`[data-conn-row="${cssEscape(tab.connId)}"]`);
  if (connEl) connEl.classList.add("is-active");
  if (tab.dbName) {
    const dbEl = document.querySelector(`[data-db-row="${cssEscape(tab.connId + "::" + tab.dbName)}"]`);
    if (dbEl) dbEl.classList.add("is-active");
  }
}

function setActiveTarget(connId, dbName) {
  let tab = getActiveTab();
  if (!tab) {
    // Selecting a database (via the tree or the topbar dropdown) should
    // activate a connection immediately, even if no tab is open yet —
    // it shouldn't require clicking "+" first.
    tab = makeBlankTab();
    tabs.push(tab);
    activeTabId = tab.id;
    renderTabs();
  }
  tab.connId = connId;
  tab.dbName = dbName || "";
  hideAutocomplete();
  refreshWorkbench();
  persistSession();
}

function renderTree() {
  const root = document.getElementById("connectionTree");
  root.innerHTML = "";

  if (connections.length === 0) {
    root.innerHTML = `<div class="tree-empty" style="padding:16px 10px;">No connections yet. Use "Add connection" below to connect to a MySQL or Postgres server.</div>`;
    renderConnectionsRail();
    return;
  }

  connections.forEach((conn) => {
    const group = document.createElement("div");
    group.className = "conn-group";

    const connRow = document.createElement("div");
    connRow.className = "tree-row";
    connRow.dataset.connRow = conn.id;
    connRow.innerHTML = `
<span class="tree-toggle" data-role="toggle">${icon("chevronRight", 10)}</span>
<span class="tree-icon icon-conn-${conn.type}">${dbLogo(conn.type, 13)}</span>
<span class="tree-label">${escapeHtml(conn.name)}</span>
<span class="tree-meta">${escapeHtml(conn.host)}</span>
<span class="tree-remove" data-role="remove" title="Remove connection">${icon("x", 11)}</span>`;
    group.appendChild(connRow);

    const dbWrap = document.createElement("div");
    dbWrap.className = "tree-children";
    const dbInner = document.createElement("div");
    dbInner.className = "tree-children-inner";
    dbInner.innerHTML = `<div class="tree-empty">Click to load databases…</div>`;
    dbWrap.appendChild(dbInner);
    group.appendChild(dbWrap);

    connRow.addEventListener("click", async (e) => {
      if (e.target.closest('[data-role="remove"]')) {
        e.stopPropagation();
        removeConnection(conn.id);
        return;
      }
      const willOpen = !dbWrap.classList.contains("open");
      connRow.querySelector('[data-role="toggle"]').classList.toggle("open", willOpen);
      dbWrap.classList.toggle("open", willOpen);
      if (willOpen && !conn.databases) {
        dbInner.innerHTML = `<div class="tree-empty">Loading databases…</div>`;
        try {
          const dbNames = await api(`/connections/${conn.id}/databases`);
          conn.databases = dbNames.map((name) => ({ name, tables: null }));
          renderDatabaseList(conn, dbInner);
          highlightActiveTreeRow();
          applyConnectionSearch();
        } catch (err) {
          dbInner.innerHTML = `<div class="tree-empty" style="color:var(--error);">Could not load databases: ${escapeHtml(err.message)}</div>`;
        }
      }
    });

    root.appendChild(group);
  });

  highlightActiveTreeRow();
  renderConnectionsRail();
  applyConnectionSearch();
}

function renderDatabaseList(conn, container) {
  container.innerHTML = "";
  if (conn.databases.length === 0) {
    container.innerHTML = `<div class="tree-empty">No databases visible on this connection.</div>`;
    return;
  }
  conn.databases.forEach((db) => {
    const dbBlock = document.createElement("div");
    const dbRow = document.createElement("div");
    dbRow.className = "tree-row";
    dbRow.dataset.dbRow = `${conn.id}::${db.name}`;
    dbRow.innerHTML = `
<span class="tree-toggle" data-role="toggle">${icon("chevronRight", 10)}</span>
<span class="tree-icon icon-db">${icon("database", 13)}</span>
<span class="tree-label">${escapeHtml(db.name)}</span>`;
    dbBlock.appendChild(dbRow);

    const tblWrap = document.createElement("div");
    tblWrap.className = "tree-children";
    const tblInner = document.createElement("div");
    tblInner.className = "tree-children-inner";
    tblInner.innerHTML = `<div class="tree-empty">Click to load tables…</div>`;
    tblWrap.appendChild(tblInner);
    dbBlock.appendChild(tblWrap);

    dbRow.addEventListener("click", async () => {
      setActiveTarget(conn.id, db.name);

      const willOpen = !tblWrap.classList.contains("open");
      dbRow.querySelector('[data-role="toggle"]').classList.toggle("open", willOpen);
      tblWrap.classList.toggle("open", willOpen);
      if (willOpen && db.tables === null) {
        tblInner.innerHTML = `<div class="tree-empty">Loading tables…</div>`;
        try {
          const tables = await api(`/connections/${conn.id}/databases/${encodeURIComponent(db.name)}/tables`);
          db.tables = tables;
          dbTablesCache.set(`${conn.id}::${db.name}`, tables);
          renderTableList(conn, db, tblInner);
          applyConnectionSearch();
        } catch (err) {
          tblInner.innerHTML = `<div class="tree-empty" style="color:var(--error);">Could not load tables: ${escapeHtml(err.message)}</div>`;
        }
      }
    });

    container.appendChild(dbBlock);
  });
}

function renderTableList(conn, db, container) {
  container.innerHTML = "";
  if (db.tables.length === 0) {
    container.innerHTML = `<div class="tree-empty">No tables in this database.</div>`;
    return;
  }
  db.tables.forEach((t) => {
    const tRow = document.createElement("div");
    tRow.className = "tree-row";
    tRow.innerHTML = `<span class="tree-toggle" style="visibility:hidden">${icon("chevronRight", 10)}</span>
<span class="tree-icon icon-table">${icon("table", 13)}</span>
<span class="tree-label">${escapeHtml(t)}</span>`;
    tRow.addEventListener("click", (e) => {
      e.stopPropagation();
      openTablePreview(conn.id, db.name, t);
    });
    container.appendChild(tRow);
  });
}

// Filters the connection tree by name as you type. Only searches whatever is
// already loaded — a connection's databases/tables aren't fetched just to
// support search, so an unexpanded branch can't be searched into (its parent
// connection still matches by name, though). Matching branches auto-expand
// so results are visible without extra clicks; clearing the box restores
// everything.
function applyConnectionSearch(queryOverride) {
  const input = document.getElementById("connectionSearchInput");
  const q = (queryOverride !== undefined ? queryOverride : input ? input.value : "").trim().toLowerCase();
  const root = document.getElementById("connectionTree");
  if (!root) return;

  root.querySelectorAll(":scope > .conn-group").forEach((group) => {
    const connRow = group.querySelector(":scope > .tree-row");
    if (!connRow) return;
    const connLabelEl = connRow.querySelector(".tree-label");
    const connLabel = connLabelEl ? connLabelEl.textContent.toLowerCase() : "";
    const connMatches = !q || connLabel.includes(q);

    const dbWrap = group.querySelector(":scope > .tree-children");
    const dbInner = dbWrap ? dbWrap.querySelector(":scope > .tree-children-inner") : null;
    const dbBlocks = dbInner ? Array.from(dbInner.children).filter((el) => el.querySelector(":scope > .tree-row")) : [];
    let anyDbVisible = false;

    dbBlocks.forEach((dbBlock) => {
      const dbRow = dbBlock.querySelector(":scope > .tree-row");
      const dbLabelEl = dbRow.querySelector(".tree-label");
      const dbLabel = dbLabelEl ? dbLabelEl.textContent.toLowerCase() : "";
      const dbNameMatches = !q || connMatches || dbLabel.includes(q);

      const tblWrap = dbBlock.querySelector(":scope > .tree-children");
      const tblInner = tblWrap ? tblWrap.querySelector(":scope > .tree-children-inner") : null;
      const tRows = tblInner ? Array.from(tblInner.querySelectorAll(":scope > .tree-row")) : [];
      let anyTableVisible = false;

      tRows.forEach((tRow) => {
        const tLabelEl = tRow.querySelector(".tree-label");
        const tLabel = tLabelEl ? tLabelEl.textContent.toLowerCase() : "";
        const showTable = !q || dbNameMatches || tLabel.includes(q);
        tRow.style.display = showTable ? "" : "none";
        if (showTable) anyTableVisible = true;
      });

      const showDb = !q || dbNameMatches || anyTableVisible;
      dbBlock.style.display = showDb ? "" : "none";
      if (showDb) anyDbVisible = true;

      if (q && !dbNameMatches && anyTableVisible && tblWrap) {
        tblWrap.classList.add("open");
        const toggle = dbRow.querySelector('[data-role="toggle"]');
        if (toggle) toggle.classList.add("open");
      }
    });

    const showConn = !q || connMatches || anyDbVisible;
    group.style.display = showConn ? "" : "none";

    if (q && !connMatches && anyDbVisible && dbWrap) {
      dbWrap.classList.add("open");
      const toggle = connRow.querySelector('[data-role="toggle"]');
      if (toggle) toggle.classList.add("open");
    }
  });
}

document.getElementById("connectionSearchInput").addEventListener("input", () => applyConnectionSearch());

async function removeConnection(connId) {
  if (!confirm("Remove this connection? Saved credentials will be deleted.")) return;
  try {
    await api(`/connections/${connId}`, { method: "DELETE" });
    connections = connections.filter((c) => c.id !== connId);
    renderTree();
    renderConnectionSelect();
  } catch (err) {
    alert("Could not remove connection: " + err.message);
  }
}

function openTablePreview(connId, dbName, tableName) {
  const safeName = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName) ? tableName : `"${tableName}"`;
  const query = `SELECT *\nFROM ${safeName}\nLIMIT 100;`;
  const tab = makeFilledTab(connId, dbName, query, tableName);
  openNewTab(tab);
  runQuery(tab, query);
}

/* =========================================================================
   RENDER: tabs
   ========================================================================= */
function renderTabs() {
  const bar = document.getElementById("tabbar");
  bar.innerHTML = "";
  tabs.forEach((tab) => {
    const el = document.createElement("div");
    el.className = "tab" + (tab.id === activeTabId ? " is-active" : "");
    const dotClass = tab.running
      ? "idle"
      : !tab.result
        ? "idle"
        : tab.result.multi
          ? tab.result.results.some((r) => r.status === "error")
            ? "error"
            : "success"
          : tab.result.status === "success"
            ? "success"
            : "error";
    const showDirty = (tab.fileHandle || tab.boundFilename) && tab.dirty;
    el.innerHTML = `<span class="dot ${dotClass}"></span>${showDirty ? '<span class="tab-dirty" title="Unsaved changes"></span>' : ""}<span class="tab-label">${escapeHtml(tab.title)}</span><span class="tab-close" data-role="close">${icon("x", 11)}</span>`;
    el.addEventListener("click", (e) => {
      if (e.target.closest('[data-role="close"]')) {
        closeTab(tab.id);
        return;
      }
      switchTab(tab.id);
    });
    bar.appendChild(el);
  });
  const addBtn = document.createElement("div");
  addBtn.className = "tab-add";
  addBtn.innerHTML = icon("plus", 15);
  addBtn.title = "New query tab";
  addBtn.addEventListener("click", () => openNewTab(makeBlankTab()));
  bar.appendChild(addBtn);
}

function switchTab(id) {
  activeTabId = id;
  hideAutocomplete();
  renderTabs();
  refreshWorkbench();
  persistSession();
}

function closeTab(id) {
  const idx = tabs.findIndex((t) => t.id === id);
  if (idx === -1) return;
  tabs.splice(idx, 1);
  if (activeTabId === id) {
    const next = tabs[Math.min(idx, tabs.length - 1)];
    activeTabId = next ? next.id : null;
  }
  hideAutocomplete();
  renderTabs();
  refreshWorkbench();
  persistSession();
}

/* =========================================================================
   WORKBENCH REFRESH
   ========================================================================= */
// Save/Format/Clear/Run act on the current tab's content, so they need one
// open. Open .sql and the connection selector are entry points that create
// or target a tab themselves, so they stay usable even with none open.
const TOOLBAR_BUTTON_IDS = ["runBtn", "formatBtn", "clearBtn", "saveFileBtn", "convertFabBtn", "openErdBtn"];

function updateSaveButtonLabel(tab) {
  const label = document.getElementById("saveFileLabel");
  if (!tab) {
    label.textContent = "Save .sql";
    return;
  }
  label.textContent = tab.fileHandle || tab.boundFilename ? "Save" : "Save .sql";
}

function refreshWorkbench() {
  const tab = getActiveTab();

  TOOLBAR_BUTTON_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = !tab;
  });
  updateSaveButtonLabel(tab);

  if (!tab) {
    document.getElementById("tabTargetLabel").textContent = "No tab open";
    codeInput.value = "";
    codeInput.disabled = true;
    refreshHighlight();
    refreshGutter();
    document.getElementById("copyResultBtn").disabled = true;
    document.getElementById("exportCsv").disabled = true;
    document.getElementById("exportJson").disabled = true;
    setStatus("idle", "No tab open");
    document.getElementById("resultsBody").innerHTML = `<div class="empty-state">
${icon("filePlus", 30)}
<div class="title">No query tab open</div>
<div class="sub">Click "+" in the tab bar to start a new query, or pick a table from the sidebar.</div>
</div>`;
    highlightActiveTreeRow();
    updateChatContextBar();
    renderChatPane();
    return;
  }

  codeInput.disabled = false;
  loadTabIntoEditor(tab);
  const conn = findConn(tab.connId);
  document.getElementById("tabTargetLabel").textContent = conn
    ? `${conn.name} · ${tab.dbName || "no database"}`
    : "No connection selected";
  const select = document.getElementById("connectionSelect");
  select.value = conn ? conn.id : "";
  renderResults(tab);
  highlightActiveTreeRow();
  updateChatContextBar();
  renderChatPane();
}

/* =========================================================================
   CONNECTION SELECT (topbar)
   ========================================================================= */
function renderConnectionSelect() {
  const select = document.getElementById("connectionSelect");
  select.innerHTML = "";
  if (connections.length === 0) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No connections yet";
    select.appendChild(opt);
  } else {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Select a connection…";
    select.appendChild(placeholder);
  }
  connections.forEach((conn) => {
    const opt = document.createElement("option");
    opt.value = conn.id;
    opt.textContent = `${conn.name} (${conn.type})`;
    select.appendChild(opt);
  });
  const addOpt = document.createElement("option");
  addOpt.value = "__add__";
  addOpt.textContent = "Add new connection…";
  select.appendChild(addOpt);

  const tab = getActiveTab();
  select.value = tab && tab.connId ? tab.connId : "";
}

document.getElementById("connectionSelect").addEventListener("change", (e) => {
  const value = e.target.value;
  const tab = getActiveTab();
  if (value === "__add__") {
    openModal();
    if (tab) e.target.value = tab.connId || "";
    return;
  }
  if (!value) return;
  const conn = findConn(value);
  const dbName = conn && conn.databases && conn.databases[0] ? conn.databases[0].name : "";
  setActiveTarget(value, dbName);
});

/* =========================================================================
   CODE EDITOR (textarea + highlight overlay)
   ========================================================================= */
const codeInput = document.getElementById("codeInput");
const highlightLayer = document.getElementById("highlightLayer");
const gutter = document.getElementById("gutter");
const LINE_HEIGHT = 20; // must match .code-input / .code-highlight line-height in CSS

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Wraps every occurrence of `term` in <mark class="search-hit"> within an
// already-built HTML string, without ever touching text inside a tag (so it
// can safely run on top of syntax-highlighted or JSON-colored markup). A
// match that spans across a tag boundary (e.g. straddling a <span>) won't be
// found — an acceptable tradeoff for a lightweight highlighter that never
// risks corrupting the HTML.
function highlightSearchInHtml(html, term) {
  if (!term) return html;
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escapedTerm, "gi");
  return html
    .split(/(<[^>]+>)/g)
    .map((segment) => {
      if (segment.startsWith("<")) return segment;
      return segment.replace(re, (match) => `<mark class="search-hit">${match}</mark>`);
    })
    .join("");
}

function highlightSql(text) {
  let out = escapeHtml(text);
  out = out.replace(/(--[^\n]*)/g, '<span class="cmt">$1</span>');
  out = out.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>');
  out = out.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="num">$1</span>');
  const kwPattern = new RegExp("\\b(" + KEYWORDS.join("|") + ")\\b", "gi");
  out = out.replace(kwPattern, '<span class="kw">$1</span>');
  out = out.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, '<span class="fn">$1</span>');
  return out + "\n";
}

// Generic single-pass highlighter: scans the RAW text once, classifies each
// token, and escapes+wraps it exactly once. This is deliberately different
// from highlightSql's sequential-regex-passes approach above — that only
// works for SQL because no SQL keyword happens to collide with the wrapper
// span's own "class" attribute name. PHP's `class` keyword collides with it
// directly (a sequential pass would corrupt class="cmt" into
// <span class="kw">class</span>="cmt"), so PHP/JS need a real tokenizer that
// never re-scans its own already-emitted HTML.
function tokenizeHighlight(text, tokenRegex, classify) {
  let result = "";
  let lastIndex = 0;
  let m;
  tokenRegex.lastIndex = 0;
  while ((m = tokenRegex.exec(text)) !== null) {
    const token = m[0];
    const offset = m.index;
    result += escapeHtml(text.slice(lastIndex, offset));
    const cls = classify(token, text, offset);
    result += cls ? `<span class="${cls}">${escapeHtml(token)}</span>` : escapeHtml(token);
    lastIndex = offset + token.length;
    if (tokenRegex.lastIndex === m.index) tokenRegex.lastIndex++; // guard against zero-length matches
  }
  result += escapeHtml(text.slice(lastIndex));
  return result;
}

const PHP_KEYWORDS = new Set([
  "echo",
  "print",
  "function",
  "return",
  "if",
  "else",
  "elseif",
  "endif",
  "foreach",
  "endforeach",
  "for",
  "endfor",
  "while",
  "endwhile",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "default",
  "class",
  "interface",
  "extends",
  "implements",
  "new",
  "public",
  "private",
  "protected",
  "static",
  "const",
  "final",
  "abstract",
  "try",
  "catch",
  "finally",
  "throw",
  "namespace",
  "use",
  "require",
  "require_once",
  "include",
  "include_once",
  "array",
  "true",
  "false",
  "null",
  "and",
  "or",
  "xor",
  "instanceof",
  "global",
  "as",
  "isset",
  "unset",
  "empty",
  "list",
  "yield",
  "fn",
  "match",
]);
// Comments, block comments, heredoc/nowdoc (treated as one string span,
// not parsed further), quoted strings, the open tag, variables, numbers,
// then a generic identifier (classified below as keyword/function/plain).
const PHP_TOKEN_RE =
  /\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/|<<<\s*'?([A-Za-z_]\w*)'?[\s\S]*?\n\1\b|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|<\?php\b|\$[A-Za-z_]\w*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b/g;

function classifyPhp(token, fullText, offset) {
  if (token.startsWith("//") || token.startsWith("#") || token.startsWith("/*")) return "cmt";
  if (token.startsWith("<<<")) return "str";
  if (token.startsWith("'") || token.startsWith('"')) return "str";
  if (token === "<?php") return "kw";
  if (token.startsWith("$")) return "var";
  if (/^\d+(\.\d+)?$/.test(token)) return "num";
  if (PHP_KEYWORDS.has(token.toLowerCase())) return "kw";
  if (/^[A-Za-z_]\w*$/.test(token)) {
    const after = fullText.slice(offset + token.length);
    if (/^\s*\(/.test(after)) return "fn";
  }
  return null;
}

function highlightPhp(text) {
  return tokenizeHighlight(text, PHP_TOKEN_RE, classifyPhp);
}

const JS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "default",
  "class",
  "extends",
  "new",
  "try",
  "catch",
  "finally",
  "throw",
  "async",
  "await",
  "import",
  "export",
  "from",
  "typeof",
  "instanceof",
  "null",
  "undefined",
  "true",
  "false",
  "this",
  "require",
  "module",
  "exports",
  "of",
  "in",
  "yield",
  "static",
  "get",
  "set",
]);
// Template literals are treated as one string span rather than parsing
// ${...} interpolation — the code this app generates never uses it (the
// embedded SQL is escaped into a plain backtick string), so that's not a
// real limitation here, just a simplification.
const JS_TOKEN_RE =
  /\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b/g;

function classifyJs(token, fullText, offset) {
  if (token.startsWith("//") || token.startsWith("/*")) return "cmt";
  if (token.startsWith("`") || token.startsWith("'") || token.startsWith('"')) return "str";
  if (/^\d+(\.\d+)?$/.test(token)) return "num";
  if (JS_KEYWORDS.has(token)) return "kw";
  if (/^[A-Za-z_$][\w$]*$/.test(token)) {
    const after = fullText.slice(offset + token.length);
    if (/^\s*\(/.test(after)) return "fn";
  }
  return null;
}

function highlightJs(text) {
  return tokenizeHighlight(text, JS_TOKEN_RE, classifyJs);
}

function refreshHighlight() {
  let html = highlightSql(codeInput.value);
  if (editorFindTerm) html = highlightSearchInHtml(html, editorFindTerm);
  highlightLayer.innerHTML = html;
}

function refreshGutter() {
  const lines = codeInput.value.split("\n").length;
  let html = "";
  for (let i = 1; i <= lines; i++) html += `<div>${i}</div>`;
  gutter.innerHTML = html;
}

function loadTabIntoEditor(tab) {
  codeInput.value = tab.query;
  refreshHighlight();
  refreshGutter();
}

function markTabDirty(tab) {
  if (!tab.fileHandle && !tab.boundFilename) return; // nothing saved yet — dirty indicator not meaningful
  if (tab.dirty) return; // already shown
  tab.dirty = true;
  const tabEl = document.querySelector(".tab.is-active");
  if (tabEl && !tabEl.querySelector(".tab-dirty")) {
    const dot = document.createElement("span");
    dot.className = "tab-dirty";
    dot.title = "Unsaved changes";
    tabEl.insertBefore(dot, tabEl.querySelector(".tab-label"));
  }
}

codeInput.addEventListener("input", () => {
  refreshHighlight();
  refreshGutter();
  const tab = getActiveTab();
  if (tab) {
    tab.query = codeInput.value;
    markTabDirty(tab);
  }
  schedulePersist();
  updateAutocomplete();
  updateChatContextBar();
});
codeInput.addEventListener("scroll", () => {
  highlightLayer.scrollTop = codeInput.scrollTop;
  highlightLayer.scrollLeft = codeInput.scrollLeft;
  gutter.scrollTop = codeInput.scrollTop;
  hideAutocomplete();
});
codeInput.addEventListener("click", () => {
  updateAutocomplete();
});

codeInput.addEventListener("keydown", (e) => {
  if (acState.visible) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      acMoveActive(1);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      acMoveActive(-1);
      return;
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      acceptSuggestion(acState.activeIndex);
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      hideAutocomplete();
      return;
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    const tab = getActiveTab();
    if (tab) runQuery(tab, codeInput.value);
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "/") {
    e.preventDefault();
    toggleCommentSelection();
    return;
  }
  if (e.key === "Tab") {
    e.preventDefault();
    const start = codeInput.selectionStart,
      end = codeInput.selectionEnd;
    codeInput.value = codeInput.value.slice(0, start) + "  " + codeInput.value.slice(end);
    codeInput.selectionStart = codeInput.selectionEnd = start + 2;
    codeInput.dispatchEvent(new Event("input"));
  }
});

// Ctrl+/ — toggles "-- " on every line touched by the selection (or just
// the current line if nothing is selected). Mirrors common editor behavior:
// if every non-blank line in range is already commented, uncomment them
// all; otherwise comment all of them (blank lines are left alone).
function toggleCommentSelection() {
  const value = codeInput.value;
  const selStart = codeInput.selectionStart;
  const selEnd = codeInput.selectionEnd;

  let lineStart = value.lastIndexOf("\n", selStart - 1) + 1;
  let lineEndIdx = value.indexOf("\n", selEnd);
  if (lineEndIdx === -1) lineEndIdx = value.length;

  const block = value.slice(lineStart, lineEndIdx);
  const lines = block.split("\n");

  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  const allCommented = nonEmptyLines.length > 0 && nonEmptyLines.every((l) => /^\s*--/.test(l));

  const newLines = allCommented
    ? lines.map((l) => l.replace(/^(\s*)--\s?/, "$1"))
    : lines.map((l) => (l.trim().length === 0 || /^\s*--/.test(l) ? l : l.replace(/^(\s*)/, "$1-- ")));

  const newBlock = newLines.join("\n");
  const delta = newBlock.length - block.length;

  codeInput.value = value.slice(0, lineStart) + newBlock + value.slice(lineEndIdx);
  codeInput.selectionStart = lineStart;
  codeInput.selectionEnd = lineEndIdx + delta;
  codeInput.dispatchEvent(new Event("input"));
  codeInput.focus();
}

document.getElementById("formatBtn").addEventListener("click", () => {
  if (!getActiveTab()) return;
  hideAutocomplete();
  let v = codeInput.value;
  KEYWORDS.forEach((k) => {
    v = v.replace(new RegExp("\\b" + k + "\\b", "gi"), k);
  });
  codeInput.value = v;
  codeInput.dispatchEvent(new Event("input"));
});
document.getElementById("clearBtn").addEventListener("click", () => {
  if (!getActiveTab()) return;
  hideAutocomplete();
  codeInput.value = "";
  codeInput.dispatchEvent(new Event("input"));
  codeInput.focus();
});

/* =========================================================================
   AUTOCOMPLETE — schema-aware suggestions for keywords, tables, and columns
   (with type + primary-key info) pulled from the connected database.
   ========================================================================= */
const dbTablesCache = new Map(); // `${connId}::${db}` -> [tableName, ...]
const tableColumnsCache = new Map(); // `${connId}::${db}::${table}` -> [{name,dataType,isPrimaryKey}, ...]
let acRequestSeq = 0;
const acState = { visible: false, items: [], activeIndex: 0, wordStart: 0, wordEnd: 0 };

async function getTablesCached(connId, dbName) {
  const key = `${connId}::${dbName}`;
  if (dbTablesCache.has(key)) return dbTablesCache.get(key);
  try {
    const tables = await api(`/connections/${connId}/databases/${encodeURIComponent(dbName)}/tables`);
    dbTablesCache.set(key, tables);
    return tables;
  } catch (e) {
    return [];
  }
}

async function getColumnsCached(connId, dbName, table) {
  const key = `${connId}::${dbName}::${table}`;
  if (tableColumnsCache.has(key)) return tableColumnsCache.get(key);
  try {
    const cols = await api(
      `/connections/${connId}/databases/${encodeURIComponent(dbName)}/tables/${encodeURIComponent(table)}/columns`,
    );
    tableColumnsCache.set(key, cols);
    return cols;
  } catch (e) {
    return [];
  }
}

function extractReferencedTables(sql) {
  const names = new Set();
  const re = /\b(?:FROM|JOIN)\s+(?:["`]?[a-zA-Z_][a-zA-Z0-9_]*["`]?\.)?["`]?([a-zA-Z_][a-zA-Z0-9_]*)["`]?/gi;
  let m;
  while ((m = re.exec(sql))) {
    names.add(m[1]);
  }
  return Array.from(names);
}

function getCurrentWordInfo() {
  if (codeInput.selectionStart !== codeInput.selectionEnd) return null;
  const value = codeInput.value;
  const pos = codeInput.selectionStart;
  let start = pos;
  while (start > 0 && /[A-Za-z0-9_]/.test(value[start - 1])) start--;
  return { word: value.slice(start, pos), start, end: pos };
}

function precedingKeyword(value, wordStart) {
  const before = value.slice(0, wordStart).trimEnd();
  const m = /([A-Za-z_][A-Za-z0-9_]*)\s*$/.exec(before);
  return m ? m[1].toUpperCase() : "";
}

async function updateAutocomplete() {
  const myReq = ++acRequestSeq;
  const tab = getActiveTab();
  if (!tab) {
    hideAutocomplete();
    return;
  }
  const info = getCurrentWordInfo();
  if (!info || info.word.length === 0) {
    hideAutocomplete();
    return;
  }
  const word = info.word;
  const wordLower = word.toLowerCase();
  const prevKw = precedingKeyword(codeInput.value, info.start);

  let items = [];
  const tableTriggers = ["FROM", "JOIN", "INTO", "UPDATE"];

  if (tableTriggers.includes(prevKw)) {
    if (tab.connId && tab.dbName) {
      const tables = await getTablesCached(tab.connId, tab.dbName);
      if (myReq !== acRequestSeq) return;
      items = tables.filter((t) => t.toLowerCase().startsWith(wordLower)).map((t) => ({ kind: "table", name: t }));
    }
  } else {
    if (tab.connId && tab.dbName) {
      const refTables = extractReferencedTables(codeInput.value);
      for (const t of refTables) {
        const cols = await getColumnsCached(tab.connId, tab.dbName, t);
        if (myReq !== acRequestSeq) return;
        cols.forEach((c) => {
          if (c.name.toLowerCase().startsWith(wordLower)) {
            items.push({ kind: "column", name: c.name, dataType: c.dataType, isPrimaryKey: c.isPrimaryKey, table: t });
          }
        });
      }
      const allTables = await getTablesCached(tab.connId, tab.dbName);
      if (myReq !== acRequestSeq) return;
      allTables
        .filter((t) => t.toLowerCase().startsWith(wordLower))
        .forEach((t) => items.push({ kind: "table", name: t }));
    }
    KEYWORDS.filter((k) => k.toLowerCase().startsWith(wordLower)).forEach((k) =>
      items.push({ kind: "keyword", name: k }),
    );
  }

  const seen = new Set();
  items = items
    .filter((i) => {
      const key = i.kind + ":" + i.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 40);

  if (items.length === 0) {
    hideAutocomplete();
    return;
  }

  acState.items = items;
  acState.activeIndex = 0;
  acState.wordStart = info.start;
  acState.wordEnd = info.end;
  renderAutocomplete(word);
}

function acIconFor(item) {
  if (item.kind === "table") return icon("table", 12, "ac-icon-table");
  if (item.kind === "keyword") return icon("keyword", 12, "ac-icon-kw");
  if (item.isPrimaryKey) return icon("key", 12, "ac-icon-pk");
  const t = (item.dataType || "").toLowerCase();
  if (/int|decimal|numeric|float|double|real|serial/.test(t)) return icon("diamond", 10, "ac-icon-num");
  if (/date|time/.test(t)) return icon("diamond", 10, "ac-icon-date");
  if (/char|text|uuid|json|enum/.test(t)) return icon("diamond", 10, "ac-icon-str");
  if (/bool|tinyint/.test(t)) return icon("diamond", 10, "ac-icon-bool");
  return icon("diamond", 10, "ac-icon-default");
}

function acTypeLabel(item) {
  if (item.kind === "table") return "table";
  if (item.kind === "keyword") return "keyword";
  return item.dataType || "";
}

function highlightMatch(name, word) {
  if (word && name.toLowerCase().startsWith(word.toLowerCase())) {
    return `<b>${escapeHtml(name.slice(0, word.length))}</b>${escapeHtml(name.slice(word.length))}`;
  }
  return escapeHtml(name);
}

function renderAutocomplete(currentWord) {
  const popup = document.getElementById("autocompletePopup");
  popup.innerHTML = acState.items
    .map((item, i) => {
      const sourceHtml = item.kind === "column" ? `<span class="ac-source">${escapeHtml(item.table)}</span>` : "";
      return `<div class="ac-item${i === acState.activeIndex ? " is-active" : ""}" data-index="${i}">
<span class="ac-icon">${acIconFor(item)}</span>
<span class="ac-type">${escapeHtml(acTypeLabel(item))}</span>
<span class="ac-name">${highlightMatch(item.name, currentWord)}</span>
${sourceHtml}
</div>`;
    })
    .join("");

  popup.querySelectorAll(".ac-item").forEach((el) => {
    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      acceptSuggestion(Number(el.dataset.index));
    });
  });

  positionAutocomplete();
  popup.style.display = "block";
  acState.visible = true;
}

function acMoveActive(delta) {
  const n = acState.items.length;
  acState.activeIndex = (acState.activeIndex + delta + n) % n;
  document.querySelectorAll("#autocompletePopup .ac-item").forEach((el) => {
    el.classList.toggle("is-active", Number(el.dataset.index) === acState.activeIndex);
  });
  const activeEl = document.querySelector(`#autocompletePopup .ac-item[data-index="${acState.activeIndex}"]`);
  if (activeEl) activeEl.scrollIntoView({ block: "nearest" });
}

function acceptSuggestion(idx) {
  const item = acState.items[idx];
  if (!item) return;
  const value = codeInput.value;
  const newValue = value.slice(0, acState.wordStart) + item.name + value.slice(acState.wordEnd);
  codeInput.value = newValue;
  const newCaret = acState.wordStart + item.name.length;
  codeInput.selectionStart = codeInput.selectionEnd = newCaret;
  hideAutocomplete();
  codeInput.dispatchEvent(new Event("input"));
  codeInput.focus();
}

function hideAutocomplete() {
  acState.visible = false;
  acState.items = [];
  const popup = document.getElementById("autocompletePopup");
  popup.style.display = "none";
  popup.innerHTML = "";
}

// Mirror-div technique to translate a caret text-offset into pixel coordinates
// within the textarea, so the popup can be positioned right under the cursor.
function getCaretPixelPosition(textarea, position) {
  const mirror = document.createElement("div");
  const style = getComputedStyle(textarea);
  const props = [
    "boxSizing",
    "width",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "letterSpacing",
    "textTransform",
    "wordSpacing",
    "lineHeight",
    "whiteSpace",
    "wordWrap",
    "wordBreak",
  ];
  props.forEach((p) => {
    mirror.style[p] = style[p];
  });
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordWrap = "break-word";
  mirror.style.top = "0px";
  mirror.style.left = "-99999px";
  mirror.style.height = "auto";
  document.body.appendChild(mirror);

  mirror.textContent = textarea.value.substring(0, position);
  const marker = document.createElement("span");
  marker.textContent = "\u200b";
  mirror.appendChild(marker);

  const top = marker.offsetTop;
  const left = marker.offsetLeft;
  document.body.removeChild(mirror);
  return { top, left };
}

function positionAutocomplete() {
  const popup = document.getElementById("autocompletePopup");
  const pos = getCaretPixelPosition(codeInput, acState.wordStart);
  const editorShell = document.querySelector(".editor-shell");
  const shellHeight = editorShell.getBoundingClientRect().height;
  const areaWidth = codeInput.getBoundingClientRect().width;

  let top = pos.top - codeInput.scrollTop + LINE_HEIGHT;
  let left = pos.left - codeInput.scrollLeft;

  if (top > shellHeight - 60) {
    top = Math.max(0, pos.top - codeInput.scrollTop - 210);
  }
  if (left > areaWidth - 240) left = Math.max(0, areaWidth - 240);
  if (top < 0) top = 0;
  if (left < 0) left = 0;

  popup.style.top = top + "px";
  popup.style.left = left + "px";
}

/* =========================================================================
   FIND / SEARCH — Ctrl+F opens a find bar scoped to whatever you're
   currently focused in: the SQL editor, or the results panel (table row
   filtering, or highlighting for JSON). The sidebar search boxes above
   (connections, history) are always-visible and handled separately.
   ========================================================================= */
let editorFindTerm = "";
let editorFindMatches = [];
let editorFindIndex = -1;

function computeEditorMatches(term) {
  editorFindMatches = [];
  if (!term) return;
  const text = codeInput.value.toLowerCase();
  const t = term.toLowerCase();
  let idx = 0;
  while ((idx = text.indexOf(t, idx)) !== -1) {
    editorFindMatches.push([idx, idx + term.length]);
    idx += term.length || 1;
  }
}

function updateEditorFindDisplay() {
  refreshHighlight();
  document.getElementById("editorFindCount").textContent = editorFindMatches.length
    ? `${editorFindIndex + 1}/${editorFindMatches.length}`
    : "0/0";
}

function gotoEditorMatch(i) {
  if (editorFindMatches.length === 0) return;
  editorFindIndex = ((i % editorFindMatches.length) + editorFindMatches.length) % editorFindMatches.length;
  const [start, end] = editorFindMatches[editorFindIndex];
  codeInput.focus();
  codeInput.setSelectionRange(start, end);
  const before = codeInput.value.slice(0, start);
  const line = before.split("\n").length - 1;
  const target = line * LINE_HEIGHT - codeInput.clientHeight / 2;
  codeInput.scrollTop = Math.max(0, target);
  highlightLayer.scrollTop = codeInput.scrollTop;
  gutter.scrollTop = codeInput.scrollTop;
  updateEditorFindDisplay();
}

function openEditorFind() {
  hideAutocomplete();
  const bar = document.getElementById("editorFindBar");
  bar.style.display = "flex";
  const input = document.getElementById("editorFindInput");
  const hadSelection = codeInput.selectionStart !== codeInput.selectionEnd;
  if (hadSelection) input.value = codeInput.value.slice(codeInput.selectionStart, codeInput.selectionEnd);
  editorFindTerm = input.value;
  input.focus();
  input.select();
  computeEditorMatches(editorFindTerm);
  editorFindIndex = editorFindMatches.length ? 0 : -1;
  updateEditorFindDisplay();
}

function closeEditorFind() {
  document.getElementById("editorFindBar").style.display = "none";
  editorFindTerm = "";
  editorFindMatches = [];
  editorFindIndex = -1;
  refreshHighlight();
  codeInput.focus();
}

document.getElementById("editorFindInput").addEventListener("input", (e) => {
  editorFindTerm = e.target.value;
  computeEditorMatches(editorFindTerm);
  editorFindIndex = editorFindMatches.length ? 0 : -1;
  if (editorFindIndex === 0) gotoEditorMatch(0);
  else updateEditorFindDisplay();
});
document.getElementById("editorFindInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    gotoEditorMatch(editorFindIndex + (e.shiftKey ? -1 : 1));
  }
  if (e.key === "Escape") {
    e.preventDefault();
    closeEditorFind();
  }
});
document.getElementById("editorFindPrev").addEventListener("click", () => gotoEditorMatch(editorFindIndex - 1));
document.getElementById("editorFindNext").addEventListener("click", () => gotoEditorMatch(editorFindIndex + 1));
document.getElementById("editorFindClose").addEventListener("click", closeEditorFind);

// Results find: row-filtering for the Table view, highlight-in-place for
// the JSON view. A single term persists across view/tab switches so it
// keeps applying — renderResults() calls this itself after every render.
let resultsFindTerm = "";

function isResultsFindOpen() {
  const bar = document.getElementById("resultsFindBar");
  return bar && bar.style.display !== "none";
}

function openResultsFind() {
  const bar = document.getElementById("resultsFindBar");
  bar.style.display = "flex";
  const input = document.getElementById("resultsFindInput");
  input.focus();
  input.select();
  applyResultsFind();
}

function closeResultsFind() {
  document.getElementById("resultsFindBar").style.display = "none";
  resultsFindTerm = "";
  document.getElementById("resultsFindInput").value = "";
  applyResultsFind();
}

function applyResultsFind() {
  const countEl = document.getElementById("resultsFindCount");
  const tab = getActiveTab();
  if (!countEl) return;
  const result = getActiveResultData(tab);
  if (!result || result.status !== "success") {
    countEl.textContent = "";
    return;
  }
  const term = resultsFindTerm.trim();

  if (tab.view === "table") {
    const rows = document.querySelectorAll("#resultsBody table.result-table tbody tr");
    if (!term) {
      rows.forEach((r) => (r.style.display = ""));
      countEl.textContent = "";
      return;
    }
    const q = term.toLowerCase();
    let visible = 0;
    rows.forEach((r) => {
      const match = r.textContent.toLowerCase().includes(q);
      r.style.display = match ? "" : "none";
      if (match) visible++;
    });
    countEl.textContent = `${visible} of ${rows.length} rows`;
  } else {
    const pre = document.querySelector("#resultsBody .json-view");
    if (!pre) {
      countEl.textContent = "";
      return;
    }
    if (!pre.dataset.baseHtml) pre.dataset.baseHtml = pre.innerHTML;
    if (!term) {
      pre.innerHTML = pre.dataset.baseHtml;
      countEl.textContent = "";
      return;
    }
    pre.innerHTML = highlightSearchInHtml(pre.dataset.baseHtml, term);
    const matches = pre.querySelectorAll("mark.search-hit");
    countEl.textContent = `${matches.length} match${matches.length === 1 ? "" : "es"}`;
    if (matches.length) matches[0].scrollIntoView({ block: "center" });
  }
}

document.getElementById("resultsFindInput").addEventListener("input", (e) => {
  resultsFindTerm = e.target.value;
  applyResultsFind();
});
document.getElementById("resultsFindInput").addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeResultsFind();
  }
});
document.getElementById("resultsFindClose").addEventListener("click", closeResultsFind);

// Ctrl/Cmd+F: opens the editor find bar if the SQL editor is focused,
// otherwise the results find bar (table filter / JSON highlight) — as long
// as a query tab is actually open. Falls through to the browser's own find
// when there's nothing to search, or when a sidebar search box is focused
// (those own their own filtering already).
document.addEventListener("keydown", (e) => {
  const isFindShortcut = (e.ctrlKey || e.metaKey) && (e.key === "f" || e.key === "F");
  if (!isFindShortcut) return;
  const active = document.activeElement;
  if (active && (active.id === "connectionSearchInput" || active.id === "historySearchInput")) return;
  const tab = getActiveTab();
  if (!tab) return;
  e.preventDefault();
  if (active === codeInput) {
    openEditorFind();
  } else {
    openResultsFind();
  }
});

// Ctrl/Cmd+S — save (in place if already linked/named, otherwise the same
// picker/prompt the Save button uses). Ctrl/Cmd+Shift+S — always prompts
// for a new location, even if one's already bound. Both preventDefault so
// the browser's own "Save Page As" dialog never appears. Ctrl/Cmd+O opens
// a .sql file, same as the Open button.
document.addEventListener("keydown", (e) => {
  if (!(e.ctrlKey || e.metaKey)) return;
  const key = e.key.toLowerCase();

  if (key === "s") {
    e.preventDefault();
    const tab = getActiveTab();
    if (!tab) return;
    if (e.shiftKey) {
      saveTabAsNewFile(tab);
    } else {
      saveTabToFile(tab);
    }
    return;
  }
  if (key === "o") {
    e.preventDefault();
    openSqlFile();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const ef = document.getElementById("editorFindBar");
  const rf = document.getElementById("resultsFindBar");
  if (ef && ef.style.display !== "none") closeEditorFind();
  if (rf && rf.style.display !== "none") closeResultsFind();
  hideSelectionPanel();
});

/* =========================================================================
   SELECT-AND-ASK — Cursor-style panel. Selecting text in the SQL editor
   shows a small floating panel with a free-form instruction box and a mode
   picker:
     Edit Selection  — rewrites the selection in place with the model's reply
     Quick Question  — asks about the selection, answer shown inline here
     Send to Chat    — hands it off to the full agent chat panel
   The picked mode is remembered (localStorage) like the model picker.
   ========================================================================= */
const SELECTION_MODE_KEY = "querybench.selectionmode.v1";
const SELECTION_MODE_LABELS = { edit: "Edit Selection", ask: "Quick Question", chat: "Send to Chat" };
let selectionPanelMode = "edit";
let editorSelectionRange = { start: 0, end: 0 };

function getEditorSelectionText() {
  if (codeInput.selectionStart === codeInput.selectionEnd) return "";
  return codeInput.value.slice(codeInput.selectionStart, codeInput.selectionEnd);
}

function positionSelectionPanel() {
  const panel = document.getElementById("selectionPanel");
  const pos = getCaretPixelPosition(codeInput, codeInput.selectionEnd);
  const areaWidth = codeInput.getBoundingClientRect().width;

  panel.style.display = "flex"; // must be visible to measure its own size below
  const panelRect = panel.getBoundingClientRect();

  let top = pos.top - codeInput.scrollTop - panelRect.height - 8;
  let left = pos.left - codeInput.scrollLeft;

  if (top < 0) top = pos.top - codeInput.scrollTop + LINE_HEIGHT + 4; // flip below if no room above
  if (left + panelRect.width > areaWidth) left = Math.max(0, areaWidth - panelRect.width - 4);
  if (left < 0) left = 0;

  panel.style.top = top + "px";
  panel.style.left = left + "px";
}

function showSelectionPanel() {
  const findOpen = document.getElementById("editorFindBar").style.display !== "none";
  if (findOpen || !getEditorSelectionText()) {
    // Don't yank the panel away while the user is actively typing in it —
    // only auto-hide for a genuinely empty/irrelevant selection state.
    if (document.activeElement !== document.getElementById("selectionPanelInput")) {
      hideSelectionPanel();
    }
    return;
  }
  editorSelectionRange = { start: codeInput.selectionStart, end: codeInput.selectionEnd };
  hideAutocomplete();
  positionSelectionPanel();
}

function hideSelectionPanel() {
  document.getElementById("selectionPanel").style.display = "none";
  document.getElementById("selectionModeMenu").style.display = "none";
  const input = document.getElementById("selectionPanelInput");
  input.value = "";
  const resultEl = document.getElementById("selectionPanelResult");
  resultEl.style.display = "none";
  resultEl.textContent = "";
  resultEl.classList.remove("selection-panel-result-error");
}

codeInput.addEventListener("mouseup", showSelectionPanel);
codeInput.addEventListener("keyup", (e) => {
  if (e.shiftKey) showSelectionPanel();
});
codeInput.addEventListener("scroll", hideSelectionPanel);

// Clicking anything in the panel except the actual text input shouldn't
// steal focus away from wherever it currently is (this is what stops a
// button click from collapsing the editor's text selection). The input
// itself needs normal click-to-focus behavior so typing works at all.
document.getElementById("selectionPanel").addEventListener("mousedown", (e) => {
  if (e.target.id === "selectionPanelInput") return;
  e.preventDefault();
});

// The panel needs to hold focus independently of the editor once the user
// clicks into its input box — so blur only closes it once focus has moved
// somewhere genuinely outside the panel (and isn't just back to the editor,
// which happens naturally if they click back in to adjust the selection).
codeInput.addEventListener("blur", () => {
  setTimeout(hideAutocomplete, 120);
  setTimeout(() => {
    if (!document.getElementById("selectionPanel").contains(document.activeElement)) {
      hideSelectionPanel();
    }
  }, 120);
});
document.getElementById("selectionPanelInput").addEventListener("blur", () => {
  setTimeout(() => {
    const active = document.activeElement;
    if (active !== codeInput && !document.getElementById("selectionPanel").contains(active)) {
      hideSelectionPanel();
    }
  }, 120);
});

document.getElementById("selectionPanelClose").addEventListener("click", hideSelectionPanel);

function setSelectionMode(mode) {
  selectionPanelMode = mode;
  document.getElementById("selectionModeLabel").textContent = SELECTION_MODE_LABELS[mode] || mode;
  document.querySelectorAll(".selection-mode-item").forEach((el) => {
    el.classList.toggle("is-selected", el.dataset.mode === mode);
  });
  try {
    localStorage.setItem(SELECTION_MODE_KEY, mode);
  } catch (e) {
    /* ignore */
  }
}

function initSelectionMode() {
  let saved = "edit";
  try {
    saved = localStorage.getItem(SELECTION_MODE_KEY) || "edit";
  } catch (e) {
    /* ignore */
  }
  setSelectionMode(SELECTION_MODE_LABELS[saved] ? saved : "edit");
}
initSelectionMode();

document.getElementById("selectionModeTrigger").addEventListener("click", (e) => {
  e.stopPropagation();
  const menu = document.getElementById("selectionModeMenu");
  if (menu.style.display !== "none") {
    menu.style.display = "none";
    return;
  }
  const trigger = e.currentTarget;
  menu.style.display = "block"; // must be visible to measure its own size below
  const triggerRect = trigger.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  let top = triggerRect.top - menuRect.height - 6;
  if (top < 4) top = triggerRect.bottom + 6; // flip below if there's no room above
  let left = triggerRect.right - menuRect.width;
  if (left < 4) left = 4;
  if (left + menuRect.width > window.innerWidth - 4) left = window.innerWidth - menuRect.width - 4;

  menu.style.top = top + "px";
  menu.style.left = left + "px";
});
document.querySelectorAll(".selection-mode-item").forEach((el) => {
  el.addEventListener("click", () => {
    setSelectionMode(el.dataset.mode);
    document.getElementById("selectionModeMenu").style.display = "none";
    document.getElementById("selectionPanelInput").focus();
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#selectionModeWrap")) {
    document.getElementById("selectionModeMenu").style.display = "none";
  }
});

// Strips a single leading/trailing ```sql ... ``` fence if the model wrapped
// its answer in one, since "Edit Selection" needs raw SQL to drop straight
// back into the editor, not markdown.
function stripCodeFence(text) {
  const trimmed = text.trim();
  const fullMatch = /^```[a-z0-9_+-]*\s*\n?([\s\S]*?)\n?```$/i.exec(trimmed);
  if (fullMatch) return fullMatch[1].trim();
  // The model may have added prose around the fence despite instructions
  // not to — pull out just the fenced portion rather than dumping the
  // whole reply (commentary included) into the editor.
  const anyFenceMatch = /```[a-z0-9_+-]*\s*\n?([\s\S]*?)\n?```/i.exec(trimmed);
  if (anyFenceMatch) return anyFenceMatch[1].trim();
  return trimmed;
}

// Replaces the originally-selected range with `newText` using execCommand
// so it lands on the browser's native undo stack (Ctrl+Z works afterwards) —
// setting codeInput.value directly would silently bypass that.
function applyEditToSelection(newText) {
  codeInput.focus();
  codeInput.setSelectionRange(editorSelectionRange.start, editorSelectionRange.end);
  const applied = document.execCommand && document.execCommand("insertText", false, newText);
  if (!applied) {
    const { start, end } = editorSelectionRange;
    codeInput.value = codeInput.value.slice(0, start) + newText + codeInput.value.slice(end);
    codeInput.setSelectionRange(start, start + newText.length);
  }
  codeInput.dispatchEvent(new Event("input"));
}

function showSelectionResult(text, isError) {
  const resultEl = document.getElementById("selectionPanelResult");
  resultEl.style.display = "block";
  resultEl.textContent = text;
  resultEl.classList.toggle("selection-panel-result-error", !!isError);
}

async function runQuickQuestion(instruction, sel) {
  const model = document.getElementById("chatModelSelect").value;
  showSelectionResult("Thinking…", false);
  const question = instruction || "What does this SQL do?";
  const contextMessage = buildQueryContextMessage();
  const messages = [
    ...(contextMessage ? [contextMessage] : []),
    { role: "user", content: `${question}\n\nSelected SQL:\n\`\`\`sql\n${sel}\n\`\`\`` },
  ];
  try {
    const data = await api("/chat", { method: "POST", body: JSON.stringify({ model, messages }) });
    showSelectionResult(data.reply, false);
  } catch (err) {
    showSelectionResult(err.message, true);
  }
}

async function runEditSelection(instruction, sel) {
  const model = document.getElementById("chatModelSelect").value;
  showSelectionResult("Editing…", false);
  const ask = instruction || "Fix any issues in this SQL.";
  const prompt =
    `${ask}\n\nSelected SQL:\n\`\`\`sql\n${sel}\n\`\`\`\n\n` +
    `Reply with ONLY the corrected SQL for this selection, no explanation, no markdown fences, ` +
    `since your reply will directly replace the selected text.`;
  try {
    const data = await api("/chat", {
      method: "POST",
      body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }] }),
    });
    applyEditToSelection(stripCodeFence(data.reply));
    hideSelectionPanel();
  } catch (err) {
    showSelectionResult(err.message, true);
  }
}

async function submitSelectionPanel() {
  const sel = getEditorSelectionText();
  if (!sel) {
    hideSelectionPanel();
    return;
  }
  const instruction = document.getElementById("selectionPanelInput").value.trim();

  if (selectionPanelMode === "chat") {
    const tab = getActiveTab();
    if (!tab) return;
    const prompt = instruction
      ? `${instruction}\n\nSelected SQL:\n\`\`\`sql\n${sel}\n\`\`\``
      : `About this part of the query:\n\`\`\`sql\n${sel}\n\`\`\``;
    hideSelectionPanel();
    expandToSessionTab("chat");
    await sendChatMessage(tab, prompt);
    return;
  }

  if (selectionPanelMode === "ask") {
    await runQuickQuestion(instruction, sel);
    return;
  }

  await runEditSelection(instruction, sel);
}

document.getElementById("selectionPanelInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitSelectionPanel();
  }
  if (e.key === "Escape") {
    e.preventDefault();
    hideSelectionPanel();
    codeInput.focus();
  }
});

/* =========================================================================
   OPEN / SAVE .sql FILES
   In Chromium browsers (secure context — HTTPS or localhost), this uses the
   File System Access API so Save writes directly back to the same file on
   disk once it's linked, no re-prompting. Firefox/Safari/non-secure
   contexts fall back to a one-time filename prompt + browser download,
   remembering the name so later saves don't ask again (though each save
   still produces a new download rather than a true in-place update — that
   part of the API isn't available outside Chromium).
   ========================================================================= */
function sanitizeFilename(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "query";
}

function flashLabel(el, text, ms) {
  const original = el.textContent;
  el.textContent = text;
  setTimeout(() => {
    el.textContent = original;
  }, ms || 1100);
}

// Chrome can require write permission on a file handle to be re-confirmed
// (a lightweight inline prompt, not a file picker) if it's not already in
// the 'granted' state. Checking this explicitly avoids createWritable()
// throwing and falling back to a fresh save-as picker unnecessarily.
async function verifyWritePermission(handle) {
  const opts = { mode: "readwrite" };
  if ((await handle.queryPermission(opts)) === "granted") return true;
  if ((await handle.requestPermission(opts)) === "granted") return true;
  return false;
}

async function saveTabToFile(tab) {
  const label = document.getElementById("saveFileLabel");

  if (tab.fileHandle) {
    try {
      const allowed = await verifyWritePermission(tab.fileHandle);
      if (!allowed) throw new Error("Write permission was not granted for the linked file.");
      const writable = await tab.fileHandle.createWritable();
      await writable.write(tab.query);
      await writable.close();
      tab.dirty = false;
      renderTabs();
      flashLabel(label, "Saved!", 1100);
    } catch (err) {
      tab.fileHandle = null;
      alert(
        `Could not update the linked file directly (${err.message}). It may have been moved, renamed, or deleted, choose a location to save again.`,
      );
      await saveTabToFile(tab);
    }
    return;
  }

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `${tab.title || "query"}.sql`,
        types: [{ description: "SQL file", accept: { "application/sql": [".sql"] } }],
      });
      tab.fileHandle = handle;
      tab.boundFilename = handle.name;
      tab.title = handle.name.replace(/\.sql$/i, "");
      const writable = await handle.createWritable();
      await writable.write(tab.query);
      await writable.close();
      tab.dirty = false;
      renderTabs();
      updateSaveButtonLabel(tab);
      persistSession();
      flashLabel(label, "Saved!", 1100);
    } catch (err) {
      if (err && err.name !== "AbortError") alert("Could not save file: " + err.message);
    }
    return;
  }

  // Fallback: no File System Access API available.
  if (tab.boundFilename) {
    downloadBlob(tab.query, tab.boundFilename, "application/sql");
    tab.dirty = false;
    renderTabs();
    flashLabel(label, "Downloaded", 1100);
    return;
  }
  const input = prompt("Save as filename (without extension):", tab.title || "query");
  if (input === null) return;
  const clean = sanitizeFilename(input);
  tab.title = clean;
  tab.boundFilename = `${clean}.sql`;
  tab.dirty = false;
  renderTabs();
  updateSaveButtonLabel(tab);
  persistSession();
  downloadBlob(tab.query, tab.boundFilename, "application/sql");
  flashLabel(label, "Downloaded", 1100);
}

document.getElementById("saveFileBtn").addEventListener("click", () => {
  const tab = getActiveTab();
  if (tab) saveTabToFile(tab);
});

// Unlike saveTabToFile, this always asks for a fresh location — that's the
// whole point of "Save As" — even when the tab already has a linked file
// handle or a remembered filename from a previous save.
async function saveTabAsNewFile(tab) {
  const label = document.getElementById("saveFileLabel");

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `${tab.title || "query"}.sql`,
        types: [{ description: "SQL file", accept: { "application/sql": [".sql"] } }],
      });
      tab.fileHandle = handle;
      tab.boundFilename = handle.name;
      tab.title = handle.name.replace(/\.sql$/i, "");
      const writable = await handle.createWritable();
      await writable.write(tab.query);
      await writable.close();
      tab.dirty = false;
      renderTabs();
      updateSaveButtonLabel(tab);
      persistSession();
      flashLabel(label, "Saved!", 1100);
    } catch (err) {
      if (err && err.name !== "AbortError") alert("Could not save file: " + err.message);
    }
    return;
  }

  // Fallback (no File System Access API): always prompt for a fresh name,
  // rather than silently reusing a name already chosen the way a plain
  // Save would.
  const input = prompt("Save as filename (without extension):", tab.title || "query");
  if (input === null) return;
  const clean = sanitizeFilename(input);
  tab.title = clean;
  tab.boundFilename = `${clean}.sql`;
  tab.fileHandle = null;
  tab.dirty = false;
  renderTabs();
  updateSaveButtonLabel(tab);
  persistSession();
  downloadBlob(tab.query, tab.boundFilename, "application/sql");
  flashLabel(label, "Downloaded", 1100);
}

async function openSqlFile() {
  if (window.showOpenFilePicker) {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: "SQL file", accept: { "application/sql": [".sql"], "text/plain": [".txt"] } }],
      });
      const file = await handle.getFile();
      const text = await file.text();
      const title = handle.name.replace(/\.sql$|\.txt$/i, "") || "Imported";
      const tab = makeFilledTab(null, "", text, title);
      // Ask for write access now, while opening, so Save can write straight
      // back to this file later without needing a separate permission step.
      await verifyWritePermission(handle).catch(() => false);
      tab.fileHandle = handle;
      tab.boundFilename = handle.name;
      openNewTab(tab);
    } catch (err) {
      if (err && err.name !== "AbortError") alert("Could not open file: " + err.message);
    }
    return;
  }
  // Fallback: plain file input (Firefox/Safari/non-secure contexts) — read-only, no live handle.
  document.getElementById("openFileInput").click();
}

document.getElementById("openFileBtn").addEventListener("click", openSqlFile);
document.getElementById("openFileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const title = file.name.replace(/\.sql$|\.txt$/i, "") || "Imported";
    const tab = makeFilledTab(null, "", String(reader.result), title);
    tab.boundFilename = /\.(sql|txt)$/i.test(file.name) ? file.name : `${title}.sql`;
    openNewTab(tab);
  };
  reader.onerror = () => alert("Could not read that file.");
  reader.readAsText(file);
  e.target.value = "";
});

/* =========================================================================
   QUERY EXECUTION (real API call)
   ========================================================================= */
async function runQuery(tab, sqlOverride) {
  hideAutocomplete();
  const sql = sqlOverride !== undefined ? sqlOverride : codeInput.value;
  tab.query = sql;
  if (!tab.connId) {
    tab.result = {
      status: "error",
      message: "Pick a connection first, use the dropdown at the top, or click a database in the sidebar.",
    };
    if (tab.id === activeTabId) renderResults(tab);
    renderTabs();
    return;
  }
  const conn = findConn(tab.connId);

  tab.running = true;
  renderTabs();
  if (tab.id === activeTabId) {
    setStatus("running", "Running…");
    document.getElementById("resultsBody").innerHTML =
      `<div class="empty-state">${icon("loader", 26, "icon-spin")}<div class="title">Executing query</div><div class="sub">Talking to ${conn ? escapeHtml(conn.name) : "connection"} / ${escapeHtml(tab.dbName || "")}</div></div>`;
  }

  try {
    const data = await api("/query", {
      method: "POST",
      body: JSON.stringify({ connectionId: tab.connId, database: tab.dbName, sql }),
    });

    if (data.multi) {
      // Multiple statements were run — keep them all on this same tab, with
      // its own sub-tabs inside the results panel, rather than spawning a
      // new top-level query tab per statement.
      tab.result = { status: "success", multi: true, results: data.results };
      tab.activeResultIndex = 0;
      tab.chartConfig = null;
    } else {
      tab.result = {
        status: "success",
        columns: data.columns,
        rows: data.rows,
        ms: data.ms,
        rowCount: data.rowCount,
        truncated: data.truncated,
      };
    }
  } catch (err) {
    tab.result = { status: "error", message: err.message };
  }
  tab.running = false;
  renderTabs();
  if (tab.id === activeTabId) {
    renderResults(tab);
    updateChatContextBar();
  }
  loadHistory();
}

document.getElementById("runBtn").addEventListener("click", () => {
  const tab = getActiveTab();
  if (tab) runQuery(tab, codeInput.value);
});

function setStatus(kind, text) {
  const pill = document.getElementById("statusPill");
  pill.className = "status-pill" + (kind === "success" ? " success" : kind === "error" ? " error" : "");
  document.getElementById("statusText").textContent = text;
}

/* =========================================================================
   RESULTS RENDERING
   ========================================================================= */
// Resolves whatever is actually being looked at right now: the tab's own
// single result, or (for a multi-statement run) whichever sub-result is
// currently selected in the result sub-tabs. Everything that reads a
// result for display/export/chat-context goes through this rather than
// tab.result directly, so multi-result tabs don't need special-casing
// scattered across the file.
function getActiveResultData(tab) {
  if (!tab || !tab.result) return null;
  if (tab.result.multi) return tab.result.results[tab.activeResultIndex] || null;
  return tab.result;
}

function renderResultSubTabs(tab) {
  const bar = document.getElementById("resultSubTabs");
  if (!tab.result || !tab.result.multi) {
    bar.style.display = "none";
    bar.innerHTML = "";
    return;
  }
  bar.style.display = "flex";
  bar.innerHTML = tab.result.results
    .map((r, i) => {
      const label = shortSqlTitle(r.sql, i);
      const active = i === tab.activeResultIndex ? " is-active" : "";
      return `<div class="result-sub-tab${active}" data-index="${i}" title="${escapeHtml(r.sql)}">
        <span class="dot ${r.status === "error" ? "error" : "success"}"></span>${escapeHtml(label)}
      </div>`;
    })
    .join("");
  bar.querySelectorAll(".result-sub-tab").forEach((el) => {
    el.addEventListener("click", () => {
      tab.activeResultIndex = Number(el.dataset.index);
      tab.chartConfig = null; // a different statement's result likely has different columns
      renderResults(tab);
      persistSession();
    });
  });
}

function renderResults(tab) {
  const body = document.getElementById("resultsBody");
  const copyBtn = document.getElementById("copyResultBtn");
  const exportCsvBtn = document.getElementById("exportCsv");
  const exportJsonBtn = document.getElementById("exportJson");
  const chartConfigBar = document.getElementById("chartConfigBar");

  document.getElementById("viewTableBtn").classList.toggle("is-active", tab.view === "table");
  document.getElementById("viewJsonBtn").classList.toggle("is-active", tab.view === "json");
  document.getElementById("viewChartBtn").classList.toggle("is-active", tab.view === "chart");
  document.getElementById("copyResultLabel").textContent = tab.view === "json" ? "Copy JSON" : "Copy CSV";

  renderResultSubTabs(tab);
  const result = getActiveResultData(tab);
  chartConfigBar.style.display =
    tab.view === "chart" && result && result.status === "success" && result.rows.length > 0 ? "flex" : "none";

  if (!result) {
    setStatus("idle", "Not run yet");
    copyBtn.disabled = true;
    exportCsvBtn.disabled = true;
    exportJsonBtn.disabled = true;
    if (activeChartInstance) {
      activeChartInstance.destroy();
      activeChartInstance = null;
    }
    body.innerHTML = `<div class="empty-state">
${icon("inbox", 30)}
<div class="title">No results yet</div>
<div class="sub">Write a query and press Run, or pick a table on the left to preview it.</div>
</div>`;
    applyResultsFind();
    return;
  }

  if (result.status === "error") {
    setStatus("error", "Query failed");
    copyBtn.disabled = true;
    exportCsvBtn.disabled = true;
    exportJsonBtn.disabled = true;
    if (activeChartInstance) {
      activeChartInstance.destroy();
      activeChartInstance = null;
    }
    body.innerHTML = `<div class="error-block"><div class="err-title">Query not executed</div>${escapeHtml(result.message)}</div>`;
    applyResultsFind();
    return;
  }

  const truncNote = result.truncated ? ` (truncated to ${result.rows.length})` : "";
  setStatus("success", `${result.rowCount} rows${truncNote} · ${result.ms} ms`);
  copyBtn.disabled = false;
  exportCsvBtn.disabled = false;
  exportJsonBtn.disabled = false;

  if (tab.view === "table") {
    if (activeChartInstance) {
      activeChartInstance.destroy();
      activeChartInstance = null;
    }
    body.innerHTML = renderTableHtml(result.columns, result.rows);
  } else if (tab.view === "json") {
    if (activeChartInstance) {
      activeChartInstance.destroy();
      activeChartInstance = null;
    }
    body.innerHTML = renderJsonHtml(result.columns, result.rows);
  } else {
    renderChartView(tab, result);
  }
  applyResultsFind();
}

function renderTableHtml(columns, rows) {
  if (rows.length === 0) {
    return `<div class="empty-state">${icon("inbox", 28)}<div class="title">Query ran, no rows returned</div></div>`;
  }
  let html = '<div class="table-wrap"><table class="result-table"><thead><tr>';
  columns.forEach((c) => (html += `<th>${escapeHtml(c)}</th>`));
  html += "</tr></thead><tbody>";
  rows.forEach((r) => {
    html += "<tr>";
    r.forEach((v) => {
      if (v === null || v === undefined) {
        html += `<td class="cell-null">NULL</td>`;
      } else if (typeof v === "number") {
        html += `<td class="cell-num">${v}</td>`;
      } else {
        html += `<td>${escapeHtml(String(v))}</td>`;
      }
    });
    html += "</tr>";
  });
  html += "</tbody></table></div>";
  return html;
}

function rowsToObjects(columns, rows) {
  return rows.map((r) => {
    const o = {};
    columns.forEach((c, i) => (o[c] = r[i]));
    return o;
  });
}

function buildCsv(columns, rows) {
  const esc = (v) =>
    v === null || v === undefined ? "" : /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
  return [columns.join(",")].concat(rows.map((r) => r.map(esc).join(","))).join("\n");
}

function renderJsonHtml(columns, rows) {
  const objs = rowsToObjects(columns, rows);
  const json = JSON.stringify(objs, null, 2);
  let colored = escapeHtml(json);
  colored = colored.replace(/"([^"]+)":/g, '<span class="jk">"$1"</span>:');
  colored = colored.replace(/: "([^"]*)"/g, ': <span class="jv-str">"$1"</span>');
  colored = colored.replace(/: (-?\d+(\.\d+)?)/g, ': <span class="jv-num">$1</span>');
  colored = colored.replace(/: null/g, ': <span class="jv-null">null</span>');
  return `<pre class="json-view">${colored}</pre>`;
}

/* =========================================================================
   RESULT CHARTING — Redash-style "pick a chart type and columns" view for
   the current result set, rendered with a self-hosted Chart.js build
   (public/vendor/chart.umd.min.js — vendored from the chart.js npm package
   rather than pulled from a CDN, so this keeps working offline). The chart
   config (type + axis columns) is remembered per tab, same as everything
   else tab-scoped in this app.
   ========================================================================= */
let activeChartInstance = null;
const CHART_PALETTE = ["#2563eb", "#dc2626", "#0f766e", "#7c3aed", "#d97706", "#059669", "#db2777", "#4f46e5"];

// Heuristic, not a real type system — the query result is just raw values,
// so a column counts as "numeric" if most of its sampled values are numbers
// OR numeric-looking strings. That second case matters a lot in practice:
// MySQL's DECIMAL/NUMERIC columns (prices, totals, anything money-shaped)
// come back from the driver as strings like "249.99", not JS numbers.
function isNumericColumn(rows, colIndex) {
  if (rows.length === 0) return false;
  const sample = rows.slice(0, 20);
  const numCount = sample.filter((r) => {
    const v = r[colIndex];
    if (typeof v === "number") return true;
    if (typeof v === "string" && v.trim() !== "" && !isNaN(Number(v))) return true;
    return false;
  }).length;
  return numCount / sample.length > 0.7;
}

function populateChartConfigOptions(tab, result) {
  const columns = result.columns;
  const rows = result.rows;
  const numericFlags = columns.map((c, i) => isNumericColumn(rows, i));

  if (!tab.chartConfig) {
    const firstNonNumeric = columns.find((c, i) => !numericFlags[i]);
    const firstNumeric = columns.find((c, i) => numericFlags[i]);
    tab.chartConfig = {
      type: "bar",
      xCol: firstNonNumeric || columns[0],
      yCols: firstNumeric ? [firstNumeric] : [],
    };
  }

  const xSelect = document.getElementById("chartXSelect");
  const ySelect = document.getElementById("chartYSelect");

  xSelect.innerHTML = columns.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
  xSelect.value = tab.chartConfig.xCol;

  ySelect.innerHTML = columns
    .map((c, i) => `<option value="${escapeHtml(c)}"${numericFlags[i] ? "" : " disabled"}>${escapeHtml(c)}</option>`)
    .join("");
  Array.from(ySelect.options).forEach((opt) => {
    opt.selected = tab.chartConfig.yCols.includes(opt.value);
  });

  document.getElementById("chartTypeSelect").value = tab.chartConfig.type;
}

function chartThemeColors() {
  const theme = document.documentElement.getAttribute("data-theme");
  const isDark = theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  return {
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    text: isDark ? "#c7ccd6" : "#4b5262",
  };
}

function renderChartView(tab, result) {
  const body = document.getElementById("resultsBody");

  if (activeChartInstance) {
    activeChartInstance.destroy();
    activeChartInstance = null;
  }

  if (result.rows.length === 0) {
    body.innerHTML = `<div class="empty-state">${icon("inbox", 28)}<div class="title">No rows to chart</div></div>`;
    return;
  }

  populateChartConfigOptions(tab, result);
  body.innerHTML = '<div class="chart-canvas-wrap"><canvas id="chartCanvas"></canvas></div>';

  const { type, xCol, yCols } = tab.chartConfig;
  if (!xCol || yCols.length === 0) {
    body.innerHTML = `<div class="empty-state"><div class="title">Pick an X and at least one Y column above</div></div>`;
    return;
  }

  const columns = result.columns;
  const rows = result.rows;
  const xIndex = columns.indexOf(xCol);
  const labels = rows.map((r) => (r[xIndex] === null || r[xIndex] === undefined ? "" : String(r[xIndex])));
  const isPie = type === "pie" || type === "doughnut";
  const colors = chartThemeColors();

  let datasets;
  if (isPie) {
    // A pie/doughnut can only sensibly show one series — use the first Y column picked.
    const yIndex = columns.indexOf(yCols[0]);
    datasets = [
      {
        label: yCols[0],
        data: rows.map((r) => Number(r[yIndex]) || 0),
        backgroundColor: labels.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]),
      },
    ];
  } else if (type === "scatter") {
    const yIndex = columns.indexOf(yCols[0]);
    datasets = [
      {
        label: yCols[0],
        data: rows.map((r) => ({ x: Number(r[xIndex]) || 0, y: Number(r[yIndex]) || 0 })),
        backgroundColor: CHART_PALETTE[0],
      },
    ];
  } else {
    datasets = yCols.map((yCol, i) => {
      const yIndex = columns.indexOf(yCol);
      return {
        label: yCol,
        data: rows.map((r) => Number(r[yIndex]) || 0),
        backgroundColor: type === "bar" ? CHART_PALETTE[i % CHART_PALETTE.length] : "transparent",
        borderColor: CHART_PALETTE[i % CHART_PALETTE.length],
        tension: type === "line" ? 0.25 : 0,
      };
    });
  }

  const ctx = document.getElementById("chartCanvas").getContext("2d");
  activeChartInstance = new Chart(ctx, {
    type: type,
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: datasets.length > 1 || isPie, labels: { color: colors.text } },
      },
      scales: isPie
        ? {}
        : {
            x: { ticks: { color: colors.text }, grid: { color: colors.grid } },
            y: { ticks: { color: colors.text }, grid: { color: colors.grid } },
          },
    },
  });
}

document.getElementById("chartTypeSelect").addEventListener("change", (e) => {
  const tab = getActiveTab();
  if (!tab || !tab.chartConfig) return;
  tab.chartConfig.type = e.target.value;
  renderChartView(tab, getActiveResultData(tab));
  persistSession();
});
document.getElementById("chartXSelect").addEventListener("change", (e) => {
  const tab = getActiveTab();
  if (!tab || !tab.chartConfig) return;
  tab.chartConfig.xCol = e.target.value;
  renderChartView(tab, getActiveResultData(tab));
  persistSession();
});
document.getElementById("chartYSelect").addEventListener("change", (e) => {
  const tab = getActiveTab();
  if (!tab || !tab.chartConfig) return;
  tab.chartConfig.yCols = Array.from(e.target.selectedOptions).map((o) => o.value);
  renderChartView(tab, getActiveResultData(tab));
  persistSession();
});

document.getElementById("viewTableBtn").addEventListener("click", () => {
  const tab = getActiveTab();
  if (!tab) return;
  tab.view = "table";
  renderResults(tab);
  persistSession();
});
document.getElementById("viewJsonBtn").addEventListener("click", () => {
  const tab = getActiveTab();
  if (!tab) return;
  tab.view = "json";
  renderResults(tab);
  persistSession();
});
document.getElementById("viewChartBtn").addEventListener("click", () => {
  const tab = getActiveTab();
  if (!tab) return;
  tab.view = "chart";
  renderResults(tab);
  persistSession();
});

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

// For a multi-statement tab, distinguishes "products.csv" from
// "products-result-2.csv" rather than exporting every sub-result under the
// same generic tab-title filename.
function resultExportBaseName(tab) {
  if (tab.result && tab.result.multi) return `${tab.title}-result-${tab.activeResultIndex + 1}`;
  return tab.title;
}

document.getElementById("copyResultBtn").addEventListener("click", async () => {
  const tab = getActiveTab();
  const result = getActiveResultData(tab);
  if (!result || result.status !== "success") return;
  const { columns, rows } = result;
  const text = tab.view === "json" ? JSON.stringify(rowsToObjects(columns, rows), null, 2) : buildCsv(columns, rows);
  const label = document.getElementById("copyResultLabel");
  try {
    await copyTextToClipboard(text);
    flashLabel(label, "Copied!", 1100);
  } catch (err) {
    flashLabel(label, "Copy failed", 1100);
  }
});

document.getElementById("exportCsv").addEventListener("click", () => {
  const tab = getActiveTab();
  const result = getActiveResultData(tab);
  if (!result || result.status !== "success") return;
  downloadBlob(buildCsv(result.columns, result.rows), `${resultExportBaseName(tab)}.csv`, "text/csv");
});
document.getElementById("exportJson").addEventListener("click", () => {
  const tab = getActiveTab();
  const result = getActiveResultData(tab);
  if (!result || result.status !== "success") return;
  const objs = rowsToObjects(result.columns, result.rows);
  downloadBlob(JSON.stringify(objs, null, 2), `${resultExportBaseName(tab)}.json`, "application/json");
});

/* =========================================================================
   SESSION HISTORY (server-backed)
   ========================================================================= */
async function loadHistory() {
  try {
    history = await api("/history?limit=200");
  } catch (err) {
    history = [];
  }
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  const searchInput = document.getElementById("historySearchInput");
  const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
  const filtered = q
    ? history.filter(
        (h) => (h.query || "").toLowerCase().includes(q) || (h.connectionName || "").toLowerCase().includes(q),
      )
    : history;

  document.getElementById("historyCount").textContent = q
    ? `${filtered.length} of ${history.length} runs`
    : `${history.length} run${history.length === 1 ? "" : "s"}`;

  if (history.length === 0) {
    list.innerHTML = `<div class="tree-empty" style="padding:16px 8px;">Runs you execute will show up here so you can jump back to them.</div>`;
    return;
  }
  if (filtered.length === 0) {
    list.innerHTML = `<div class="tree-empty" style="padding:16px 8px;">No runs match "${escapeHtml(q)}".</div>`;
    return;
  }
  list.innerHTML = "";
  const label = document.createElement("div");
  label.className = "history-day";
  label.textContent = "RECENT";
  list.appendChild(label);
  filtered.forEach((h) => {
    const el = document.createElement("div");
    el.className = "history-item";
    const timeStr = new Date(h.createdAt.replace(" ", "T") + "Z").toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    el.innerHTML = `
<div class="history-row1">
<span class="sw ${h.status}"></span>
<span class="history-conn">${escapeHtml(h.connectionName || "deleted connection")}</span>
<span class="history-time">${timeStr}</span>
<span class="history-item-remove" data-role="remove" title="Delete this entry">${icon("x", 10)}</span>
</div>
<div class="history-query">${escapeHtml((h.query || "").replace(/\s+/g, " ").trim())}</div>
<div class="history-meta">${h.status === "success" ? `${h.rowCount ?? 0} rows · ${h.ms ?? 0} ms` : `<span class="error-text">${escapeHtml(h.errorMessage || "failed")}</span>`}</div>`;
    el.addEventListener("click", (e) => {
      if (e.target.closest('[data-role="remove"]')) {
        e.stopPropagation();
        deleteHistoryEntry(h.id);
        return;
      }
      if (!h.connectionId || !findConn(h.connectionId)) {
        alert("The connection used for this run no longer exists.");
        return;
      }
      const tab = makeFilledTab(h.connectionId, h.databaseName, h.query, null);
      openNewTab(tab);
    });
    list.appendChild(el);
  });
}

document.getElementById("historySearchInput").addEventListener("input", () => renderHistory());

async function deleteHistoryEntry(id) {
  try {
    await api(`/history/${id}`, { method: "DELETE" });
    history = history.filter((h) => h.id !== id);
    renderHistory();
  } catch (err) {
    alert("Could not delete that entry: " + err.message);
  }
}

document.getElementById("clearAllHistory").addEventListener("click", async () => {
  if (history.length === 0) return;
  if (!confirm("Delete all session history? This cannot be undone.")) return;
  try {
    await api("/history", { method: "DELETE" });
    history = [];
    renderHistory();
  } catch (err) {
    alert("Could not clear history: " + err.message);
  }
});

/* =========================================================================
   NEW CONNECTION MODAL
   ========================================================================= */
let modalSelectedType = "mysql";
let sqliteUploadedPath = null;
const overlay = document.getElementById("modalOverlay");
function showModalMessage(text, kind) {
  const box = document.getElementById("modalMessage");
  box.style.display = "block";
  box.textContent = text;
  box.style.background = kind === "error" ? "var(--error-soft)" : "var(--success-soft)";
  box.style.color = kind === "error" ? "var(--error)" : "var(--success)";
  box.style.border = "1px solid " + (kind === "error" ? "rgba(220,38,38,0.3)" : "rgba(23,163,74,0.3)");
}
function clearModalMessage() {
  const box = document.getElementById("modalMessage");
  box.style.display = "none";
  box.textContent = "";
}
function resetSqliteUploadField() {
  sqliteUploadedPath = null;
  document.getElementById("newConnSqliteLabel").textContent = "Choose a .sqlite / .db file…";
  document.getElementById("newConnSqliteInput").value = "";
}
function openModal() {
  clearModalMessage();
  resetSqliteUploadField();
  overlay.classList.add("open");
}
function closeModalFn() {
  overlay.classList.remove("open");
}
document.getElementById("openConnModal2").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModalFn);
document.getElementById("cancelModal").addEventListener("click", closeModalFn);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModalFn();
});

document.getElementById("newConnSqliteBtn").addEventListener("click", () => {
  document.getElementById("newConnSqliteInput").click();
});
document.getElementById("newConnSqliteInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const label = document.getElementById("newConnSqliteLabel");
  label.textContent = `Uploading ${file.name}…`;
  const formData = new FormData();
  formData.append("file", file);
  try {
    // Not using the api() helper here — it always sets a JSON content type,
    // which would break the multipart upload.
    const res = await fetch("/api/connections/upload-sqlite", { method: "POST", body: formData });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `Upload failed (${res.status})`);
    sqliteUploadedPath = body.filePath;
    label.textContent = `${file.name} (${formatBytes(body.sizeBytes)}), uploaded`;
    if (!document.getElementById("newConnName").value.trim()) {
      document.getElementById("newConnName").value = file.name.replace(/\.(sqlite3?|db)$/i, "");
    }
  } catch (err) {
    sqliteUploadedPath = null;
    label.textContent = "Choose a .sqlite / .db file…";
    showModalMessage("Could not upload file: " + err.message, "error");
  }
});

document.querySelectorAll(".type-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".type-option").forEach((o) => o.classList.remove("selected"));
    opt.classList.add("selected");
    modalSelectedType = opt.dataset.type;
    document.getElementById("newConnPort").placeholder = modalSelectedType === "mysql" ? "3306" : "5432";
    const isSqlite = modalSelectedType === "sqlite";
    document.getElementById("networkFields").style.display = isSqlite ? "none" : "block";
    document.getElementById("sqliteField").style.display = isSqlite ? "block" : "none";
  });
});

function readModalForm() {
  return {
    name: document.getElementById("newConnName").value.trim(),
    type: modalSelectedType,
    host: document.getElementById("newConnHost").value.trim(),
    port: Number(document.getElementById("newConnPort").value.trim() || (modalSelectedType === "mysql" ? 3306 : 5432)),
    username: document.getElementById("newConnUser").value.trim(),
    password: document.getElementById("newConnPass").value,
    defaultDatabase: document.getElementById("newConnDb").value.trim() || null,
    filePath: sqliteUploadedPath,
  };
}

document.getElementById("testConn").addEventListener("click", async () => {
  const btn = document.getElementById("testConn");
  const body = readModalForm();
  if (!body.name || (body.type === "sqlite" ? !body.filePath : !body.host)) {
    showModalMessage(
      body.type === "sqlite"
        ? "Fill in a name and choose a file before testing."
        : "Fill in at least a name and host before testing.",
      "error",
    );
    return;
  }
  btn.disabled = true;
  const originalHtml = btn.innerHTML;
  btn.textContent = "Testing…";
  try {
    await api("/connections/test", { method: "POST", body: JSON.stringify(body) });
    showModalMessage("Connected successfully.", "success");
  } catch (err) {
    showModalMessage(err.message, "error");
  }
  btn.disabled = false;
  btn.innerHTML = originalHtml;
});

document.getElementById("saveConn").addEventListener("click", async () => {
  const body = readModalForm();
  if (!body.name || (body.type === "sqlite" ? !body.filePath : !body.host)) {
    showModalMessage(
      body.type === "sqlite" ? "Name and a chosen file are required." : "Name and host are required.",
      "error",
    );
    return;
  }
  const btn = document.getElementById("saveConn");
  btn.disabled = true;
  try {
    const created = await api("/connections", { method: "POST", body: JSON.stringify(body) });
    connections.push({
      id: created.id,
      name: created.name,
      type: created.type,
      host:
        created.type === "sqlite" ? (created.filePath || "").split(/[\\/]/).pop() : `${created.host}:${created.port}`,
      databases: null,
    });
    renderTree();
    renderConnectionSelect();
    closeModalFn();
    resetSqliteUploadField();
    ["newConnName", "newConnHost", "newConnPort", "newConnUser", "newConnPass", "newConnDb"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
  } catch (err) {
    showModalMessage(err.message, "error");
  }
  btn.disabled = false;
});

/* =========================================================================
   AI PROVIDER KEYS MODAL — save/remove encrypted API keys per provider.
   Keys never round-trip back to the browser once saved; the modal only
   ever shows a configured/not-configured status.
   ========================================================================= */
const PROVIDER_LABELS = {
  anthropic: "Anthropic (Claude)",
  openai: "OpenAI (GPT)",
  xai: "xAI (Grok)",
  custom: "Custom endpoint (Ollama, LM Studio, vLLM…)",
};
const aiSettingsOverlay = document.getElementById("aiSettingsOverlay");

function openAiSettingsModal() {
  renderAiSettings();
  aiSettingsOverlay.classList.add("open");
}
function closeAiSettingsModal() {
  aiSettingsOverlay.classList.remove("open");
}
document.getElementById("openAiSettings").addEventListener("click", openAiSettingsModal);
document.getElementById("closeAiSettings").addEventListener("click", closeAiSettingsModal);
document.getElementById("closeAiSettings2").addEventListener("click", closeAiSettingsModal);
aiSettingsOverlay.addEventListener("click", (e) => {
  if (e.target === aiSettingsOverlay) closeAiSettingsModal();
});

async function renderAiSettings() {
  const body = document.getElementById("aiSettingsBody");
  body.innerHTML = '<div style="color:var(--text-low); font-size:12px;">Loading…</div>';
  let providers;
  try {
    providers = await api("/ai-providers");
  } catch (err) {
    body.innerHTML = `<div style="color:var(--error); font-size:12px;">Could not load provider status: ${escapeHtml(err.message)}</div>`;
    return;
  }

  body.innerHTML = "";
  providers.forEach((p) => {
    const row = document.createElement("div");
    row.className = "provider-row";
    const isCustom = p.provider === "custom";
    const bodyHtml = isCustom
      ? `<input type="text" placeholder="http://localhost:11434/v1" value="${escapeHtml(p.baseUrl || "")}" data-field="baseUrl" data-provider="${p.provider}">
         <input type="password" placeholder="API key (often not needed)" data-field="apiKey" data-provider="${p.provider}">`
      : `<input type="password" placeholder="${p.configured ? "Enter a new key to replace it" : "Paste API key"}" data-field="apiKey" data-provider="${p.provider}">`;
    row.innerHTML = `
  <div class="provider-row-head">
    <span class="provider-status-dot${p.configured ? " configured" : ""}"></span>
    <span class="provider-name">${escapeHtml(PROVIDER_LABELS[p.provider] || p.provider)}</span>
    <span class="provider-status-text">${p.configured ? "Configured" : "Not configured"}</span>
  </div>
  <div class="provider-row-body${isCustom ? " provider-row-body-stacked" : ""}">
    ${bodyHtml}
    <div class="provider-row-actions">
      <button class="btn btn-sm" data-action="save" data-provider="${p.provider}">Save</button>
      <button class="btn btn-sm btn-ghost" data-action="remove" data-provider="${p.provider}" ${p.configured ? "" : "disabled"}>Remove</button>
    </div>
  </div>`;
    body.appendChild(row);
  });

  body.querySelectorAll('[data-action="save"]').forEach((btn) => {
    btn.addEventListener("click", async () => {
      const provider = btn.dataset.provider;
      const apiKeyInput = body.querySelector(`input[data-field="apiKey"][data-provider="${provider}"]`);
      const baseUrlInput = body.querySelector(`input[data-field="baseUrl"][data-provider="${provider}"]`);
      const apiKey = apiKeyInput ? apiKeyInput.value.trim() : "";
      const baseUrl = baseUrlInput ? baseUrlInput.value.trim() : "";

      if (provider === "custom") {
        if (!baseUrl) {
          baseUrlInput.focus();
          return;
        }
      } else if (!apiKey) {
        apiKeyInput.focus();
        return;
      }

      btn.disabled = true;
      try {
        await api(`/ai-providers/${provider}`, { method: "PUT", body: JSON.stringify({ apiKey, baseUrl }) });
        await renderAiSettings();
        await loadLocalModels(); // no-op for cloud/custom, but keeps things in sync if models change later
        if (provider === "custom") await loadCustomEndpointModels();
      } catch (err) {
        alert("Could not save: " + err.message);
        btn.disabled = false;
      }
    });
  });
  body.querySelectorAll('[data-action="remove"]').forEach((btn) => {
    btn.addEventListener("click", async () => {
      const provider = btn.dataset.provider;
      const label =
        provider === "custom"
          ? "custom endpoint configuration"
          : `saved ${PROVIDER_LABELS[provider] || provider} API key`;
      if (!confirm(`Remove the ${label}?`)) return;
      btn.disabled = true;
      try {
        await api(`/ai-providers/${provider}`, { method: "DELETE" });
        await renderAiSettings();
        if (provider === "custom") await loadCustomEndpointModels();
      } catch (err) {
        alert("Could not remove key: " + err.message);
        btn.disabled = false;
      }
    });
  });
}

/* =========================================================================
   CONVERT QUERY — floating button in the editor opens a menu of target
   languages/dialects. The list adapts to the active tab's source
   connection: PHP, Node.js, SQLite, and MSSQL are always offered, plus
   whichever of MySQL/PostgreSQL ISN'T the source (converting a dialect to
   itself would be a no-op). Nothing here calls an AI model or the network
   for PHP/Node.js — those are just the raw SQL dropped into standard
   PDO / mysql2-pg driver boilerplate. The three real dialect conversions
   (cross MySQL<->PostgreSQL, SQLite, MSSQL) go through node-sql-parser on
   the server, which does genuine AST-based translation rather than string
   substitution — reliable for standard SQL, but with known, disclosed
   gaps: dialect-specific functions (MySQL's IFNULL/DATE_FORMAT, say) pass
   through unchanged rather than being remapped, and MSSQL's LIMIT isn't
   rewritten to OFFSET/FETCH. A parse failure is reported plainly.
   ========================================================================= */
const CONVERT_TARGET_LABELS = {
  php: "PHP",
  nodejs: "Node.js",
  mysql: "MySQL",
  postgres: "PostgreSQL",
  sqlite: "SQLite",
  mssql: "MSSQL",
};
const CONVERT_TARGET_EXT = { php: "php", nodejs: "js", mysql: "sql", postgres: "sql", sqlite: "sql", mssql: "sql" };

// PHP/Node.js are always offered; the cross-dialect target is whichever of
// mysql/postgres ISN'T the source. SQLite/MSSQL are offered for either.
function getConvertTargetsForSourceType(sourceType) {
  const crossDialect = sourceType === "postgres" ? "mysql" : "postgres";
  return ["php", crossDialect, "sqlite", "mssql", "nodejs"];
}

function generatePhpCode(sql, sourceType) {
  const dsn = sourceType === "postgres" ? "pgsql:host=localhost;dbname=your_db" : "mysql:host=localhost;dbname=your_db";
  return [
    "<?php",
    "",
    "// Adjust host/dbname/user/password for your environment.",
    `$pdo = new PDO('${dsn}', 'user', 'password');`,
    "$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);",
    "",
    "$stmt = $pdo->query(<<<'SQL'",
    sql.trim(),
    "SQL);",
    "",
    "$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);",
    "foreach ($rows as $row) {",
    "    print_r($row);",
    "}",
  ].join("\n");
}

function generateNodeJsCode(sql, sourceType) {
  const escaped = sql.trim().replace(/`/g, "\\`");
  if (sourceType === "postgres") {
    return [
      "const { Client } = require('pg');",
      "",
      "// Adjust the connection string for your environment.",
      "const client = new Client({ connectionString: 'postgres://user:password@localhost:5432/your_db' });",
      "",
      "(async () => {",
      "  await client.connect();",
      "  const sql = `" + escaped + "`;",
      "  const { rows } = await client.query(sql);",
      "  console.log(rows);",
      "  await client.end();",
      "})();",
    ].join("\n");
  }
  return [
    "const mysql = require('mysql2/promise');",
    "",
    "(async () => {",
    "  // Adjust host/user/password/database for your environment.",
    "  const connection = await mysql.createConnection({",
    "    host: 'localhost',",
    "    user: 'user',",
    "    password: 'password',",
    "    database: 'your_db',",
    "  });",
    "  const sql = `" + escaped + "`;",
    "  const [rows] = await connection.query(sql);",
    "  console.log(rows);",
    "  await connection.end();",
    "})();",
  ].join("\n");
}

let conversionCache = {};
let conversionActiveTarget = null;
let conversionSourceType = "mysql";

document.getElementById("convertFabBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  const tab = getActiveTab();
  if (!tab) return;
  const conn = findConn(tab.connId);
  const sourceType = conn ? conn.type : "mysql";
  const menu = document.getElementById("convertFabMenu");
  if (menu.style.display !== "none") {
    menu.style.display = "none";
    return;
  }
  menu.innerHTML = getConvertTargetsForSourceType(sourceType)
    .map((t) => `<div class="convert-fab-item" data-target="${t}">${CONVERT_TARGET_LABELS[t]}</div>`)
    .join("");
  menu.querySelectorAll(".convert-fab-item").forEach((item) => {
    item.addEventListener("click", () => {
      menu.style.display = "none";
      if (!tab.query || !tab.query.trim()) {
        alert("Write a query first, there's nothing to convert yet.");
        return;
      }
      openConversionModal(item.dataset.target, sourceType);
    });
  });
  menu.style.display = "block";
});
document.addEventListener("click", (e) => {
  if (!e.target.closest("#convertFabWrap")) {
    document.getElementById("convertFabMenu").style.display = "none";
  }
});

function openConversionModal(initialTarget, sourceType) {
  conversionCache = {};
  conversionSourceType = sourceType;
  const tabsEl = document.getElementById("conversionTabs");
  tabsEl.innerHTML = getConvertTargetsForSourceType(sourceType)
    .map(
      (t) => `<button type="button" class="conversion-tab-btn" data-target="${t}">${CONVERT_TARGET_LABELS[t]}</button>`,
    )
    .join("");
  tabsEl.querySelectorAll(".conversion-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchConversionTab(btn.dataset.target));
  });
  document.getElementById("conversionOverlay").classList.add("open");
  switchConversionTab(initialTarget || "php");
}

function closeConversionModal() {
  document.getElementById("conversionOverlay").classList.remove("open");
}

function switchConversionTab(target) {
  conversionActiveTarget = target;
  document.querySelectorAll(".conversion-tab-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.target === target);
  });
  renderConversionCode();
  const entry = conversionCache[target];
  if (!entry || entry.status === "error") generateConversion(target);
}

const CONVERT_TARGET_HIGHLIGHTER = {
  php: highlightPhp,
  nodejs: highlightJs,
  mysql: highlightSql,
  postgres: highlightSql,
  sqlite: highlightSql,
  mssql: highlightSql,
};

function renderConversionCode() {
  const codeEl = document.getElementById("conversionCode");
  const hintEl = document.getElementById("conversionHint");
  const entry = conversionCache[conversionActiveTarget];
  const label = CONVERT_TARGET_LABELS[conversionActiveTarget];

  if (!entry || entry.status === "loading") {
    codeEl.textContent = "Generating…";
    codeEl.classList.remove("is-error");
    hintEl.textContent = "";
    return;
  }
  if (entry.status === "error") {
    codeEl.textContent = entry.error;
    codeEl.classList.add("is-error");
    hintEl.textContent = "";
    return;
  }
  const highlighter = CONVERT_TARGET_HIGHLIGHTER[conversionActiveTarget] || null;
  codeEl.innerHTML = highlighter ? highlighter(entry.code) : escapeHtml(entry.code);
  codeEl.classList.remove("is-error");
  hintEl.textContent = `${label} · ${entry.code.split("\n").length} lines`;
}

async function generateConversion(target) {
  const tab = getActiveTab();
  if (!tab || !tab.query || !tab.query.trim()) return;

  conversionCache[target] = { status: "loading" };
  if (target === conversionActiveTarget) renderConversionCode();

  // PHP/Node.js: pure client-side templating, no network, always succeeds.
  if (target === "php") {
    conversionCache[target] = { status: "done", code: generatePhpCode(tab.query, conversionSourceType) };
    if (target === conversionActiveTarget) renderConversionCode();
    return;
  }
  if (target === "nodejs") {
    conversionCache[target] = { status: "done", code: generateNodeJsCode(tab.query, conversionSourceType) };
    if (target === conversionActiveTarget) renderConversionCode();
    return;
  }

  // Everything else is a real dialect conversion via node-sql-parser server-side.
  try {
    const data = await api("/convert-sql", {
      method: "POST",
      body: JSON.stringify({ sql: tab.query, sourceDialect: conversionSourceType, targetDialect: target }),
    });
    conversionCache[target] = { status: "done", code: data.code };
  } catch (err) {
    conversionCache[target] = { status: "error", error: err.message };
  }
  if (target === conversionActiveTarget) renderConversionCode();
}

document.getElementById("conversionCopyBtn").addEventListener("click", async () => {
  const entry = conversionCache[conversionActiveTarget];
  if (!entry || entry.status !== "done") return;
  try {
    await copyTextToClipboard(entry.code);
  } catch (err) {
    alert("Could not copy: " + err.message);
  }
});
document.getElementById("conversionExportBtn").addEventListener("click", () => {
  const entry = conversionCache[conversionActiveTarget];
  if (!entry || entry.status !== "done") return;
  const ext = CONVERT_TARGET_EXT[conversionActiveTarget];
  const tab = getActiveTab();
  const base = (tab && tab.title ? tab.title : "query").replace(/[^a-z0-9_-]+/gi, "_");
  downloadBlob(entry.code, `${base}.${ext}`, "text/plain");
});

document.getElementById("closeConversion").addEventListener("click", closeConversionModal);
document.getElementById("closeConversion2").addEventListener("click", closeConversionModal);
const conversionOverlay = document.getElementById("conversionOverlay");
conversionOverlay.addEventListener("click", (e) => {
  if (e.target === conversionOverlay) closeConversionModal();
});

/* =========================================================================
   ER DIAGRAM — table boxes (draggable) connected by FK lines (SVG), inside
   a pannable/zoomable world. Pan and zoom are just one CSS transform on
   #erdWorld, which contains both the table boxes and the SVG lines — so
   panning/zooming never needs to recompute line coordinates, only dragging
   an individual table does (since that changes its real position in world
   space, not just the view onto it).
   ========================================================================= */
const ERD_BOX_WIDTH = 220;
const ERD_HEADER_HEIGHT = 34;
const ERD_ROW_HEIGHT = 22;
const ERD_MAX_VISIBLE_ROWS = 10; // matches .erd-table-rows max-height (260px / 22px ≈ 11.8, round down for spacing)
const ERD_COL_GAP_X = 60;
const ERD_COL_GAP_Y = 40;

let erdState = null; // { tables, foreignKeys, positions, zoom, panX, panY }

function erdBoxHeight(table) {
  return ERD_HEADER_HEIGHT + Math.min(table.columns.length, ERD_MAX_VISIBLE_ROWS) * ERD_ROW_HEIGHT;
}

function computeErdGridLayout(tables) {
  const cols = Math.max(1, Math.ceil(Math.sqrt(tables.length)));
  const colWidths = new Array(cols).fill(ERD_BOX_WIDTH);
  const rowHeights = [];
  const positions = {};

  tables.forEach((t, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    rowHeights[row] = Math.max(rowHeights[row] || 0, erdBoxHeight(t));
  });

  tables.forEach((t, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    let x = 0;
    for (let c = 0; c < col; c++) x += colWidths[c] + ERD_COL_GAP_X;
    let y = 0;
    for (let r = 0; r < row; r++) y += rowHeights[r] + ERD_COL_GAP_Y;
    positions[t.name] = { x, y };
  });

  return positions;
}

function openErdModal() {
  const tab = getActiveTab();
  if (!tab) return;
  const conn = findConn(tab.connId);
  if (!conn) {
    alert("Pick a connection for this tab first.");
    return;
  }
  const database = tab.dbName;
  if (!database) {
    alert("Pick a database for this tab first.");
    return;
  }

  document.getElementById("erdTitle").textContent = `ER diagram: ${conn.name} / ${database}`;
  document.getElementById("erdStatus").textContent = "Loading…";
  document.getElementById("erdLines").innerHTML = "";
  document.querySelectorAll(".erd-table-box").forEach((el) => el.remove());
  erdState = null;
  document.getElementById("erdOverlay").classList.add("open");

  api(`/connections/${conn.id}/databases/${encodeURIComponent(database)}/schema-diagram`)
    .then((data) => {
      if (data.tables.length === 0) {
        document.getElementById("erdStatus").textContent = "No tables in this database.";
        return;
      }
      erdState = {
        tables: data.tables,
        foreignKeys: data.foreignKeys,
        positions: computeErdGridLayout(data.tables),
        zoom: 1,
        panX: 40,
        panY: 40,
      };
      document.getElementById("erdStatus").textContent =
        `${data.tables.length} table${data.tables.length === 1 ? "" : "s"} · ${data.foreignKeys.length} relationship${data.foreignKeys.length === 1 ? "" : "s"}`;
      renderErdTables();
      renderErdLines();
      applyErdTransform();
    })
    .catch((err) => {
      document.getElementById("erdStatus").textContent = "Error: " + err.message;
    });
}

function closeErdModal() {
  document.getElementById("erdOverlay").classList.remove("open");
}

function renderErdTables() {
  const world = document.getElementById("erdWorld");
  document.querySelectorAll(".erd-table-box").forEach((el) => el.remove());

  erdState.tables.forEach((table) => {
    const pos = erdState.positions[table.name];
    const box = document.createElement("div");
    box.className = "erd-table-box";
    box.style.left = pos.x + "px";
    box.style.top = pos.y + "px";
    box.dataset.table = table.name;

    const fkColumns = new Set(erdState.foreignKeys.filter((f) => f.fromTable === table.name).map((f) => f.fromColumn));

    const rowsHtml = table.columns
      .map((c) => {
        let iconHtml = "";
        if (c.isPrimaryKey) iconHtml = `<span class="erd-col-icon erd-col-pk">${icon("key", 10)}</span>`;
        else if (fkColumns.has(c.name)) iconHtml = `<span class="erd-col-icon erd-col-fk">${icon("link", 10)}</span>`;
        else iconHtml = `<span class="erd-col-icon"></span>`;
        return `<div class="erd-col-row" data-column="${escapeHtml(c.name)}">
          ${iconHtml}
          <span class="erd-col-name">${escapeHtml(c.name)}</span>
          <span class="erd-col-type">${escapeHtml(c.dataType)}</span>
        </div>`;
      })
      .join("");

    box.innerHTML = `
      <div class="erd-table-header">${icon("table", 13)}<span>${escapeHtml(table.name)}</span></div>
      <div class="erd-table-rows">${rowsHtml}</div>
    `;
    world.appendChild(box);

    box.querySelector(".erd-table-header").addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const origX = erdState.positions[table.name].x;
      const origY = erdState.positions[table.name].y;

      function onMove(ev) {
        const dx = (ev.clientX - startX) / erdState.zoom;
        const dy = (ev.clientY - startY) / erdState.zoom;
        erdState.positions[table.name] = { x: origX + dx, y: origY + dy };
        box.style.left = erdState.positions[table.name].x + "px";
        box.style.top = erdState.positions[table.name].y + "px";
        renderErdLines();
      }
      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  });
}

// Connects each FK's source column row to the target table's matching
// column row (or the target table's header if that column isn't visible,
// e.g. scrolled out of a long column list) with a smooth curve.
function renderErdLines() {
  const svg = document.getElementById("erdLines");
  const world = document.getElementById("erdWorld");
  const worldRect = world.getBoundingClientRect();

  function anchorPoint(tableName, columnName) {
    const box = world.querySelector(`.erd-table-box[data-table="${CSS.escape(tableName)}"]`);
    if (!box) return null;
    const boxRect = box.getBoundingClientRect();
    const rowEl = box.querySelector(`.erd-col-row[data-column="${CSS.escape(columnName)}"]`);
    const targetRect = rowEl ? rowEl.getBoundingClientRect() : boxRect;
    const y = (targetRect.top + targetRect.height / 2 - worldRect.top) / erdState.zoom;
    const leftX = (boxRect.left - worldRect.left) / erdState.zoom;
    const rightX = (boxRect.right - worldRect.left) / erdState.zoom;
    return { leftX, rightX, y };
  }

  const paths = erdState.foreignKeys
    .map((fk) => {
      const from = anchorPoint(fk.fromTable, fk.fromColumn);
      const to = anchorPoint(fk.toTable, fk.toColumn);
      if (!from || !to) return "";
      // Leave from whichever side of the source box is nearer the target, and
      // arrive at the corresponding side of the target box.
      const fromOnLeft = from.leftX < to.leftX;
      const x1 = fromOnLeft ? from.rightX : from.leftX;
      const x2 = fromOnLeft ? to.leftX : to.rightX;
      const midX = (x1 + x2) / 2;
      return `<path d="M ${x1} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${x2} ${to.y}"
                fill="none" stroke="var(--accent)" stroke-width="1.5" opacity="0.55" marker-end="url(#erdArrow)" />`;
    })
    .join("");

  svg.innerHTML = `
    <defs>
      <marker id="erdArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" opacity="0.7" />
      </marker>
    </defs>
    ${paths}
  `;
}

function applyErdTransform() {
  document.getElementById("erdWorld").style.transform =
    `translate(${erdState.panX}px, ${erdState.panY}px) scale(${erdState.zoom})`;
  document.getElementById("erdZoomLabel").textContent = Math.round(erdState.zoom * 100) + "%";
}

function erdZoomBy(factor) {
  if (!erdState) return;
  erdState.zoom = Math.min(2.5, Math.max(0.3, erdState.zoom * factor));
  applyErdTransform();
}

document.getElementById("openErdBtn").addEventListener("click", openErdModal);
document.getElementById("closeErd").addEventListener("click", closeErdModal);
const erdOverlay = document.getElementById("erdOverlay");
erdOverlay.addEventListener("click", (e) => {
  if (e.target === erdOverlay) closeErdModal();
});
document.getElementById("erdZoomIn").addEventListener("click", () => erdZoomBy(1.2));
document.getElementById("erdZoomOut").addEventListener("click", () => erdZoomBy(1 / 1.2));
document.getElementById("erdFit").addEventListener("click", () => {
  if (!erdState) return;
  erdState.zoom = 1;
  erdState.panX = 40;
  erdState.panY = 40;
  applyErdTransform();
});

// Dragging the viewport background (not a table box) pans the whole world.
const erdViewport = document.getElementById("erdViewport");
erdViewport.addEventListener("mousedown", (e) => {
  if (!erdState || e.target.closest(".erd-table-box")) return;
  e.preventDefault();
  erdViewport.classList.add("is-panning");
  const startX = e.clientX;
  const startY = e.clientY;
  const origPanX = erdState.panX;
  const origPanY = erdState.panY;

  function onMove(ev) {
    erdState.panX = origPanX + (ev.clientX - startX);
    erdState.panY = origPanY + (ev.clientY - startY);
    applyErdTransform();
  }
  function onUp() {
    erdViewport.classList.remove("is-panning");
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
});

/* =========================================================================
   CHAT MODEL PICKER — Cursor-style Cloud/Local selector. Cloud models
   call their real provider API once a key is saved via the settings
   gear (see AI PROVIDER KEYS MODAL above). Local lists whatever
   .gguf/.bin files have been uploaded via the server, stored
   in data/models and tracked in SQLite. Selecting "Upload a local
   model…" opens a file picker and streams the file to the server.
   ========================================================================= */
const CHAT_MODEL_KEY = "querybench.chatmodel.v1";

function formatBytes(n) {
  if (n === null || n === undefined) return "";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = n,
    i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i > 0 && v < 10 ? 1 : 0)} ${units[i]}`;
}

function updateChatModelUi(value) {
  const isLocal = value === "local" || value.startsWith("local:");
  const isCustom = value.startsWith("custom:");
  const iconName = isLocal ? "cpu" : isCustom ? "server" : "cloud";
  document.getElementById("chatModelIcon").innerHTML = icon(iconName, 12);
  const hint = document.getElementById("chatModelHint");
  if (isLocal) hint.textContent = "Runs locally";
  else if (isCustom) hint.textContent = "OpenAI endpoint";
  else hint.textContent = "Cloud API";
}

function getSelectedChatModelLabel() {
  const select = document.getElementById("chatModelSelect");
  return select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : select.value;
}

async function loadLocalModels() {
  const group = document.getElementById("localModelGroup");
  try {
    const models = await api("/models");
    group.innerHTML = "";
    if (models.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.disabled = true;
      opt.textContent = "No local models uploaded yet";
      group.appendChild(opt);
    } else {
      models.forEach((m) => {
        const opt = document.createElement("option");
        opt.value = "local:" + m.id;
        opt.textContent = `${m.name} (${formatBytes(m.sizeBytes)})`;
        group.appendChild(opt);
      });
    }
    const uploadOpt = document.createElement("option");
    uploadOpt.value = "__upload_local__";
    uploadOpt.textContent = "Upload a local model…";
    group.appendChild(uploadOpt);
  } catch (err) {
    group.innerHTML = '<option value="" disabled>Could not load local models</option>';
  }
}

async function uploadLocalModel(file) {
  const hint = document.getElementById("chatModelHint");
  hint.textContent = `Uploading ${file.name}…`;
  const formData = new FormData();
  formData.append("model", file);
  formData.append("name", file.name.replace(/\.[^.]+$/, ""));
  try {
    // Not using the api() helper here — it always sets a JSON content
    // type, which would break the multipart upload.
    const res = await fetch("/api/models", { method: "POST", body: formData });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `Upload failed (${res.status})`);
    await loadLocalModels();
    const select = document.getElementById("chatModelSelect");
    select.value = "local:" + body.id;
    try {
      localStorage.setItem(CHAT_MODEL_KEY, select.value);
    } catch (e) {
      /* ignore */
    }
    updateChatModelUi(select.value);
  } catch (err) {
    alert("Could not upload model: " + err.message);
    updateChatModelUi(document.getElementById("chatModelSelect").value);
  }
}

document.getElementById("localModelFileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  e.target.value = "";
  if (file) uploadLocalModel(file);
});

// Populates the "Custom endpoint" group from whatever's actually available
// on the configured OpenAI-compatible server (Ollama, LM Studio, vLLM…).
// Shows a configure-trigger option when nothing's set up yet, or when the
// endpoint can't be reached — never a plain empty group.
async function loadCustomEndpointModels() {
  const group = document.getElementById("customEndpointGroup");
  const configureOpt = (label) => {
    const opt = document.createElement("option");
    opt.value = "__configure_custom__";
    opt.textContent = label;
    return opt;
  };

  let providers;
  try {
    providers = await api("/ai-providers");
  } catch (err) {
    group.innerHTML = "";
    group.appendChild(configureOpt("Configure custom endpoint…"));
    return;
  }

  const custom = providers.find((p) => p.provider === "custom");
  if (!custom || !custom.configured) {
    group.innerHTML = "";
    group.appendChild(configureOpt("Configure custom endpoint…"));
    return;
  }

  group.innerHTML = "";
  try {
    const models = await api("/ai-providers/custom/models");
    if (models.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.disabled = true;
      opt.textContent = "No models found on that endpoint";
      group.appendChild(opt);
    } else {
      models.forEach((id) => {
        const opt = document.createElement("option");
        opt.value = "custom:" + id;
        opt.textContent = id;
        group.appendChild(opt);
      });
    }
  } catch (err) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.disabled = true;
    opt.textContent = "Could not reach endpoint";
    group.appendChild(opt);
  }
  group.appendChild(configureOpt("Reconfigure endpoint…"));
}

async function initChatModelPicker() {
  await loadLocalModels();
  await loadCustomEndpointModels();
  const select = document.getElementById("chatModelSelect");
  let saved = "claude-sonnet";
  try {
    saved = localStorage.getItem(CHAT_MODEL_KEY) || "claude-sonnet";
  } catch (e) {
    /* ignore */
  }
  if ([...select.options].some((o) => o.value === saved)) select.value = saved;
  updateChatModelUi(select.value);
  select.addEventListener("change", (e) => {
    if (e.target.value === "__upload_local__" || e.target.value === "__configure_custom__") {
      if (e.target.value === "__upload_local__") {
        document.getElementById("localModelFileInput").click();
      } else {
        openAiSettingsModal();
      }
      const fallback = (() => {
        try {
          return localStorage.getItem(CHAT_MODEL_KEY) || "claude-sonnet";
        } catch (err) {
          return "claude-sonnet";
        }
      })();
      e.target.value = [...select.options].some((o) => o.value === fallback) ? fallback : "claude-sonnet";
      updateChatModelUi(e.target.value);
      return;
    }
    try {
      localStorage.setItem(CHAT_MODEL_KEY, e.target.value);
    } catch (err) {
      /* ignore */
    }
    updateChatModelUi(e.target.value);
  });
}

/* =========================================================================
   SIDEBAR COLLAPSE (left: connections, right: session chat / history)
   ========================================================================= */
let leftCollapsed = false;
let rightCollapsed = false;

function applyWorkspaceColumns() {
  const leftW = leftCollapsed ? "44px" : "250px";
  const rightW = rightCollapsed ? "44px" : "300px";
  document.querySelector(".workspace").style.gridTemplateColumns = `${leftW} 1fr ${rightW}`;
}

function updateSidebarToggleIcons() {
  document.getElementById("toggleLeftSidebar").innerHTML = icon(leftCollapsed ? "chevronRight" : "chevronLeft", 13);
  document.getElementById("toggleRightSidebar").innerHTML = icon(rightCollapsed ? "chevronLeft" : "chevronRight", 13);
  document.getElementById("toggleLeftSidebar").title = leftCollapsed ? "Expand connections" : "Collapse connections";
  document.getElementById("toggleRightSidebar").title = rightCollapsed
    ? "Expand session panel"
    : "Collapse session panel";
}

function setSessionTab(tab) {
  sessionTab = tab === "history" ? "history" : "chat";
  document.getElementById("sidebarRight").dataset.sessionTab = sessionTab;
  document.querySelectorAll("#sessionTabs .session-tab").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.sessionTab === sessionTab);
  });
  document.querySelectorAll("#sessionRail .rail-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.sessionTab === sessionTab);
  });
}

function expandToSessionTab(tab) {
  setSessionTab(tab);
  if (!rightCollapsed) {
    persistUiPrefs();
    return;
  }
  rightCollapsed = false;
  document.getElementById("sidebarRight").classList.remove("collapsed");
  applyWorkspaceColumns();
  updateSidebarToggleIcons();
  persistUiPrefs();
}

function toggleLeftSidebar() {
  leftCollapsed = !leftCollapsed;
  document.getElementById("sidebarLeft").classList.toggle("collapsed", leftCollapsed);
  applyWorkspaceColumns();
  updateSidebarToggleIcons();
  if (leftCollapsed) renderConnectionsRail();
  persistUiPrefs();
}

function toggleRightSidebar() {
  rightCollapsed = !rightCollapsed;
  document.getElementById("sidebarRight").classList.toggle("collapsed", rightCollapsed);
  applyWorkspaceColumns();
  updateSidebarToggleIcons();
  persistUiPrefs();
}

document.getElementById("toggleLeftSidebar").addEventListener("click", toggleLeftSidebar);
document.getElementById("toggleRightSidebar").addEventListener("click", toggleRightSidebar);

document.getElementById("sessionTabs").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-session-tab]");
  if (!btn) return;
  setSessionTab(btn.dataset.sessionTab);
  persistUiPrefs();
});

document.getElementById("sessionRail").addEventListener("click", (e) => {
  const item = e.target.closest("[data-session-tab]");
  if (!item) return;
  expandToSessionTab(item.dataset.sessionTab);
});

// Each query tab owns its own list of chat conversations (tab.chatSessions)
// plus which one is active (tab.activeChatSessionId, or null). Rendering
// is a pure function of that state:
//   no sessions yet          -> blank empty-state (current default look)
//   sessions exist, none active -> list of past chats + "New chat"
//   a session is active      -> that conversation's bubbles
let chatSessionSeq = 0;

function chatEmptyStateHtml() {
  return `<div class="chat-empty">
<div class="chat-empty-icon">${icon("sparkles", 22)}</div>
<div class="chat-empty-title">Agent chat</div>
<div class="chat-empty-copy">Ask about this query, schema, or results.</div>
</div>`;
}

function getActiveChatSession(tab) {
  if (!tab || !tab.activeChatSessionId) return null;
  return tab.chatSessions.find((s) => s.id === tab.activeChatSessionId) || null;
}

function renderChatBubbles(container, session) {
  const visible = session.messages.filter((m) => m.role === "user" || m.role === "assistant");
  if (visible.length === 0) {
    container.innerHTML = chatEmptyStateHtml();
    return;
  }
  container.innerHTML = visible
    .map((m) => {
      const cls =
        "chat-bubble chat-bubble-" +
        m.role +
        (m.error ? " chat-bubble-error" : "") +
        (m.pending ? " chat-bubble-pending" : "");
      return `<div class="${cls}">${escapeHtml(m.content)}</div>`;
    })
    .join("");
  container.scrollTop = container.scrollHeight;
}

function renderChatSessionsList(container, tab) {
  const sorted = [...tab.chatSessions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  container.innerHTML = sorted
    .map((s) => {
      const firstUser = s.messages.find((m) => m.role === "user");
      const preview = firstUser ? firstUser.content.replace(/\s+/g, " ").trim() : "(empty chat)";
      const count = s.messages.filter((m) => m.role === "user" || m.role === "assistant").length;
      const when = new Date(s.updatedAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return `<div class="chat-session-item" data-session-id="${s.id}">
  <div class="chat-session-item-top">
    <span class="chat-session-item-title">${escapeHtml(s.title || preview.slice(0, 48) || "New chat")}</span>
    <span class="chat-session-item-remove" data-role="remove" data-session-id="${s.id}" title="Delete this chat">${icon("x", 10)}</span>
  </div>
  <div class="chat-session-item-preview">${escapeHtml(preview)}</div>
  <div class="chat-session-item-meta">${count} message${count === 1 ? "" : "s"} · ${when}</div>
</div>`;
    })
    .join("");

  container.querySelectorAll(".chat-session-item").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest('[data-role="remove"]')) return;
      openChatSession(el.dataset.sessionId);
    });
  });
  container.querySelectorAll('[data-role="remove"]').forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteChatSession(el.dataset.sessionId);
    });
  });
}

function renderChatPane() {
  const toolbar = document.getElementById("chatPaneToolbar");
  const backBtn = document.getElementById("chatPaneBack");
  const titleEl = document.getElementById("chatPaneTitle");
  const container = document.getElementById("chatMessages");
  const tab = getActiveTab();

  if (!tab) {
    toolbar.style.display = "none";
    container.innerHTML = chatEmptyStateHtml();
    return;
  }

  const session = getActiveChatSession(tab);

  if (session) {
    toolbar.style.display = "flex";
    backBtn.style.display = "inline-flex";
    titleEl.textContent = session.title || "New chat";
    renderChatBubbles(container, session);
    return;
  }

  if (tab.chatSessions.length === 0) {
    toolbar.style.display = "none";
    container.innerHTML = chatEmptyStateHtml();
    return;
  }

  toolbar.style.display = "flex";
  backBtn.style.display = "none";
  titleEl.textContent = `${tab.chatSessions.length} previous chat${tab.chatSessions.length === 1 ? "" : "s"}`;
  renderChatSessionsList(container, tab);
}

function openChatSession(id) {
  const tab = getActiveTab();
  if (!tab) return;
  tab.activeChatSessionId = id;
  renderChatPane();
  persistSession();
}

function backToChatList() {
  const tab = getActiveTab();
  if (!tab) return;
  tab.activeChatSessionId = null;
  renderChatPane();
  persistSession();
}

function startNewChatSession() {
  const tab = getActiveTab();
  if (!tab) return;
  chatSessionSeq++;
  const session = {
    id: "chatsess" + chatSessionSeq,
    title: null,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tab.chatSessions.push(session);
  tab.activeChatSessionId = session.id;
  renderChatPane();
  persistSession();
  document.getElementById("chatInput").focus();
}

function deleteChatSession(id) {
  const tab = getActiveTab();
  if (!tab) return;
  if (!confirm("Delete this chat? This cannot be undone.")) return;
  tab.chatSessions = tab.chatSessions.filter((s) => s.id !== id);
  if (tab.activeChatSessionId === id) tab.activeChatSessionId = null;
  renderChatPane();
  persistSession();
}

document.getElementById("chatPaneBack").addEventListener("click", backToChatList);
document.getElementById("chatNewBtn").addEventListener("click", startNewChatSession);

// Reflects, in the chat panel itself, exactly what will be attached if
// the user sends a message right now — so the query context is visible
// rather than a silent black box. Called whenever the active tab, its
// query text, or its last result changes.
function updateChatContextBar() {
  const label = document.getElementById("chatContextLabel");
  const tab = getActiveTab();
  if (!tab || !tab.query || !tab.query.trim()) {
    label.textContent = "No query tab open, nothing attached";
    return;
  }
  const lines = tab.query.split("\n").length;
  const conn = findConn(tab.connId);
  const target = conn ? `${conn.name} / ${tab.dbName || "no database"}` : "no connection";
  const result = getActiveResultData(tab);
  let resultNote = "";
  if (result) {
    const multiNote = tab.result.multi ? ` (result ${tab.activeResultIndex + 1}/${tab.result.results.length})` : "";
    resultNote =
      result.status === "success"
        ? ` · last run: ${result.rowCount} rows${multiNote}`
        : ` · last run: failed${multiNote}`;
  }
  label.textContent = `Attached: "${tab.title}" (${lines} line${lines === 1 ? "" : "s"}, ${target})${resultNote}`;
}

// Builds the (not displayed in the thread) system message carrying the
// live query editor contents, computed fresh at send time so it's
// never stale even mid-conversation. The full multi-statement text always
// goes in, but the result summary describes whichever sub-result is
// currently being looked at, matching the context bar above.
function buildQueryContextMessage() {
  const tab = getActiveTab();
  if (!tab || !tab.query || !tab.query.trim()) return null;
  const conn = findConn(tab.connId);
  let content =
    `You are helping the user inside BenhSQL, a SQL query editor. ` +
    `Current tab: "${tab.title}". ` +
    `Target: ${conn ? `${conn.name} (${conn.type})` : "no connection selected"} / ${tab.dbName || "no database selected"}. ` +
    `Current SQL in the editor:\n\`\`\`sql\n${tab.query}\n\`\`\``;
  const result = getActiveResultData(tab);
  if (result) {
    const multiNote = tab.result.multi
      ? ` This tab ran ${tab.result.results.length} statements; the following is statement ${tab.activeResultIndex + 1} (\`${result.sql}\`).`
      : "";
    content +=
      result.status === "success"
        ? `\n\n${multiNote} It was last run successfully, returning ${result.rowCount} rows with columns: ${result.columns.join(", ")}.`
        : `\n\n${multiNote} It was last run and failed with this error: ${result.message}`;
  }
  return { role: "system", content };
}

// Sends `text` as a new user turn in the given tab's active (or newly
// created) chat session. Shared by the composer submit handler and the
// editor's select-and-ask toolbar, so both go through the exact same
// session bookkeeping, pending-bubble, and error handling.
async function sendChatMessage(tab, text) {
  if (!tab || !text || !text.trim()) return;

  let session = getActiveChatSession(tab);
  if (!session) {
    chatSessionSeq++;
    session = {
      id: "chatsess" + chatSessionSeq,
      title: null,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tab.chatSessions.push(session);
    tab.activeChatSessionId = session.id;
  }
  if (!session.title) session.title = text.slice(0, 48);

  session.messages.push({ role: "user", content: text });
  session.updatedAt = new Date().toISOString();
  renderChatPane();
  persistSession();

  const model = document.getElementById("chatModelSelect").value;
  const sendBtn = document.getElementById("chatSend");
  sendBtn.disabled = true;

  const pendingIndex = session.messages.push({ role: "assistant", content: "Thinking…", pending: true }) - 1;
  renderChatPane();

  const contextMessage = buildQueryContextMessage();
  const outgoingHistory = session.messages.filter((m) => !m.pending).map((m) => ({ role: m.role, content: m.content }));
  const outgoing = contextMessage ? [contextMessage, ...outgoingHistory] : outgoingHistory;

  try {
    const data = await api("/chat", {
      method: "POST",
      body: JSON.stringify({ model, messages: outgoing }),
    });
    session.messages[pendingIndex] = { role: "assistant", content: data.reply };
  } catch (err) {
    session.messages[pendingIndex] = { role: "assistant", content: err.message, error: true };
  }
  session.updatedAt = new Date().toISOString();
  renderChatPane();
  persistSession();
  sendBtn.disabled = false;
}

document.getElementById("chatComposer").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  const tab = getActiveTab();
  if (!tab) return;
  input.value = "";
  input.style.height = "auto";
  await sendChatMessage(tab, text);
  input.focus();
});

document.getElementById("chatInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    document.getElementById("chatComposer").requestSubmit();
  }
});

// Vertical rail shown when the connections sidebar is collapsed — one label
// per connection (max 5), click any of them to expand back.
function renderConnectionsRail() {
  const rail = document.getElementById("connectionsRail");
  rail.innerHTML = "";
  const shown = connections.slice(0, 5);
  shown.forEach((conn) => {
    const item = document.createElement("div");
    item.className = "rail-item";
    item.textContent = conn.name;
    item.title = `${conn.name} (${conn.type}), click to expand`;
    item.addEventListener("click", toggleLeftSidebar);
    rail.appendChild(item);
  });
  if (connections.length > 5) {
    const more = document.createElement("div");
    more.className = "rail-item rail-more";
    more.textContent = `+${connections.length - 5} more`;
    more.title = "More connections, click to expand";
    more.addEventListener("click", toggleLeftSidebar);
    rail.appendChild(more);
  }
}

/* =========================================================================
   RESIZABLE RESULTS PANEL — drag the handle between the editor and the
   results area to make the results panel taller or shorter.
   ========================================================================= */
const editorShellEl = document.getElementById("editorShell");
const resizeHandleEl = document.getElementById("resizeHandle");
let resizeDragging = false;
let resizeStartY = 0;
let resizeStartHeight = 0;
let resizeMin = 100;
let resizeMax = 600;

resizeHandleEl.addEventListener("mousedown", (e) => {
  resizeDragging = true;
  resizeStartY = e.clientY;
  resizeStartHeight = editorShellEl.getBoundingClientRect().height;

  const mainRect = document.querySelector(".main").getBoundingClientRect();
  const tabbarH = document.getElementById("tabbar").getBoundingClientRect().height;
  const toolbarH = document.querySelector(".toolbar").getBoundingClientRect().height;
  const handleH = resizeHandleEl.getBoundingClientRect().height;
  const resultsToolbarH = document.querySelector(".results-toolbar").getBoundingClientRect().height;
  resizeMin = 100;
  resizeMax = Math.max(resizeMin, mainRect.height - tabbarH - toolbarH - handleH - resultsToolbarH - 80);

  resizeHandleEl.classList.add("active");
  document.body.style.cursor = "row-resize";
  document.body.style.userSelect = "none";
  e.preventDefault();
});

window.addEventListener("mousemove", (e) => {
  if (!resizeDragging) return;
  const delta = e.clientY - resizeStartY;
  const newHeight = Math.max(resizeMin, Math.min(resizeStartHeight + delta, resizeMax));
  editorShellEl.style.height = newHeight + "px";
  hideAutocomplete();
});

window.addEventListener("mouseup", () => {
  if (!resizeDragging) return;
  resizeDragging = false;
  resizeHandleEl.classList.remove("active");
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
  persistUiPrefs();
});

/* =========================================================================
   THEME (light / dark / system)
   ========================================================================= */
const THEME_KEY = "querybench.theme.v1";
const themeMedia = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function resolvedTheme(pref) {
  if (pref === "dark") return "dark";
  if (pref === "light") return "light";
  return themeMedia && themeMedia.matches ? "dark" : "light";
}

function applyTheme(pref) {
  document.documentElement.setAttribute("data-theme", resolvedTheme(pref));
  const iconName = pref === "dark" ? "moon" : pref === "light" ? "sun" : "monitor";
  const iconEl = document.getElementById("themeIcon");
  if (iconEl) iconEl.innerHTML = icon(iconName, 13);

  const logoEl = document.getElementById("logoBench");
  if (logoEl) {
    if (resolvedTheme(pref) === "dark") {
      logoEl.src = "assets/img/light.png";
    } else {
      logoEl.src = "assets/img/dark.png";
    }
  }
}

function setTheme(pref) {
  try {
    localStorage.setItem(THEME_KEY, pref);
  } catch (e) {
    /* ignore */
  }
  applyTheme(pref);
}

function initTheme() {
  let pref = "system";
  try {
    pref = localStorage.getItem(THEME_KEY) || "system";
  } catch (e) {
    /* ignore */
  }
  document.getElementById("themeSelect").value = pref;
  applyTheme(pref);
  document.getElementById("themeSelect").addEventListener("change", (e) => setTheme(e.target.value));
  if (themeMedia) {
    themeMedia.addEventListener("change", () => {
      const current = document.getElementById("themeSelect").value;
      if (current === "system") applyTheme("system");
    });
  }
}

/* =========================================================================
   UI PREFERENCES (localStorage) — sidebar collapsed state + editor height
   ========================================================================= */
const UI_PREFS_KEY = "querybench.uiprefs.v1";

function persistUiPrefs() {
  try {
    localStorage.setItem(
      UI_PREFS_KEY,
      JSON.stringify({
        leftCollapsed,
        rightCollapsed,
        sessionTab,
        editorHeightPx: editorShellEl.style.height || null,
      }),
    );
  } catch (e) {
    /* ignore */
  }
}

function restoreUiPrefs() {
  let raw;
  try {
    raw = localStorage.getItem(UI_PREFS_KEY);
  } catch (e) {
    return;
  }
  if (!raw) return;
  try {
    const prefs = JSON.parse(raw);
    if (prefs.leftCollapsed) {
      leftCollapsed = true;
      document.getElementById("sidebarLeft").classList.add("collapsed");
    }
    if (prefs.rightCollapsed) {
      rightCollapsed = true;
      document.getElementById("sidebarRight").classList.add("collapsed");
    }
    if (prefs.sessionTab === "chat" || prefs.sessionTab === "history") {
      setSessionTab(prefs.sessionTab);
    }
    applyWorkspaceColumns();
    updateSidebarToggleIcons();
    if (prefs.editorHeightPx) {
      editorShellEl.style.height = prefs.editorHeightPx;
    }
  } catch (e) {
    /* ignore malformed prefs */
  }
}

/* =========================================================================
   INIT
   ========================================================================= */
async function init() {
  try {
    const rows = await api("/connections");
    connections = rows.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      host: c.type === "sqlite" ? (c.filePath || "").split(/[\\/]/).pop() : `${c.host}:${c.port}`,
      databases: null,
    }));
  } catch (err) {
    connections = [];
  }

  const restored = restoreSession();
  if (!restored) {
    tabs = [];
    activeTabId = null;
  }

  renderTree();
  renderConnectionSelect();
  renderTabs();
  refreshWorkbench();
  updateSidebarToggleIcons();
  await initChatModelPicker();
  restoreUiPrefs();
  await loadHistory();

  if (connections.length === 0) {
    openModal();
  }
}

/* =========================================================================
   RESPONSIVE UI LAYER
   Keeps the latest template logic intact while adding the compact tablet/mobile UI.
   ========================================================================= */
function qbIsMobile() {
  return window.matchMedia && window.matchMedia("(max-width: 920px)").matches;
}

function qbSvg(name, size) {
  return typeof icon === "function" ? icon(name, size || 14) : "";
}

// Gives dropdown options a meaningful leading icon instead of just the
// selected-item checkmark: connection type logos, theme icons, and
// cloud/local for the model picker.
function getCustomSelectOptionIcon(selectId, optionValue) {
  if (selectId === "themeSelect" || selectId === "mobileThemeSelect") {
    if (optionValue === "light") return qbSvg("sun", 13);
    if (optionValue === "dark") return qbSvg("moon", 13);
    if (optionValue === "system") return qbSvg("monitor", 13);
    return "";
  }
  if (selectId === "connectionSelect" || selectId === "mobileConnectionSelect") {
    if (optionValue === "__add__") return qbSvg("plus", 13);
    if (!optionValue) return "";
    const conn = typeof findConn === "function" ? findConn(optionValue) : null;
    return conn ? dbLogo(conn.type, 13) : "";
  }
  if (selectId === "chatModelSelect") {
    if (optionValue === "__upload_local__" || optionValue === "__configure_custom__") return qbSvg("plus", 13);
    if (!optionValue) return "";
    if (optionValue.startsWith("local:")) return qbSvg("cpu", 13);
    if (optionValue.startsWith("custom:")) return qbSvg("server", 13);
    return qbSvg("cloud", 13);
  }
  return "";
}

function qbCloseMenus(except) {
  document.querySelectorAll(".qb-menu-host.open").forEach((el) => {
    if (el !== except) el.classList.remove("open");
  });
  document.querySelectorAll(".custom-select-wrap.open").forEach((el) => {
    if (!except || !el.contains(except)) {
      el.classList.remove("open");
      el.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
    }
  });
}

function qbCreateHeaderMenu() {
  const topbar = document.querySelector(".topbar");
  if (!topbar || document.getElementById("headerMore")) return;

  const host = document.createElement("div");
  host.className = "header-more qb-menu-host";
  host.id = "headerMore";
  host.innerHTML = `
        <button class="header-more-btn" id="headerMoreBtn" type="button" aria-label="More options" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"></circle></svg></button>
        <div class="header-menu" id="headerMenu">
            <span class="header-menu-label">Connection</span>
            <div class="connection-select-wrap" id="mobileConnectionWrap">
                <select class="connection-select" id="mobileConnectionSelect" aria-label="Connection"></select>
            </div>
            <span class="header-menu-label" style="margin-top:4px;">Theme</span>
            <div class="theme-select-wrap" id="mobileThemeWrap">
                <span class="theme-icon" id="mobileThemeIcon"></span>
                <select class="theme-select" id="mobileThemeSelect" title="Color theme" aria-label="Color theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                </select>
            </div>
        </div>`;
  topbar.appendChild(host);

  const btn = host.querySelector("#headerMoreBtn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = host.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) qbCloseMenus(host);
  });
}

function qbSyncMobileHeaderSelects() {
  const sourceConnection = document.getElementById("connectionSelect");
  const mobileConnection = document.getElementById("mobileConnectionSelect");
  if (sourceConnection && mobileConnection) {
    const current = mobileConnection.value;
    mobileConnection.innerHTML = sourceConnection.innerHTML;
    mobileConnection.value = sourceConnection.value || current || "";
  }

  const sourceTheme = document.getElementById("themeSelect");
  const mobileTheme = document.getElementById("mobileThemeSelect");
  if (sourceTheme && mobileTheme) {
    mobileTheme.value = sourceTheme.value;
  }

  const mobileThemeIcon = document.getElementById("mobileThemeIcon");
  const themeIcon = document.getElementById("themeIcon");
  if (mobileThemeIcon && themeIcon) mobileThemeIcon.innerHTML = themeIcon.innerHTML;
}

function qbBindMobileHeaderSelects() {
  const sourceConnection = document.getElementById("connectionSelect");
  const sourceTheme = document.getElementById("themeSelect");
  const mobileConnection = document.getElementById("mobileConnectionSelect");
  const mobileTheme = document.getElementById("mobileThemeSelect");
  if (!mobileConnection || !mobileTheme) return;

  qbSyncMobileHeaderSelects();

  if (!mobileConnection.dataset.qbBound) {
    mobileConnection.dataset.qbBound = "1";
    mobileConnection.addEventListener("change", () => {
      if (!sourceConnection) return;
      sourceConnection.value = mobileConnection.value;
      sourceConnection.dispatchEvent(new Event("change", { bubbles: true }));
    });
  }

  if (!mobileTheme.dataset.qbBound) {
    mobileTheme.dataset.qbBound = "1";
    mobileTheme.addEventListener("change", () => {
      if (!sourceTheme) return;
      sourceTheme.value = mobileTheme.value;
      sourceTheme.dispatchEvent(new Event("change", { bubbles: true }));
      const iconEl = document.getElementById("mobileThemeIcon");
      const sourceIcon = document.getElementById("themeIcon");
      if (iconEl && sourceIcon) iconEl.innerHTML = sourceIcon.innerHTML;
    });
  }

  sourceConnection?.addEventListener("change", qbSyncMobileHeaderSelects);
  sourceTheme?.addEventListener("change", qbSyncMobileHeaderSelects);
}

function qbMenuButton(label, action, extraClass = "") {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = `toolbar-menu-item ${extraClass}`.trim();
  btn.textContent = label;
  btn.dataset.qbAction = action;
  return btn;
}

function qbCreateToolbarMenu() {
  const toolbar = document.querySelector(".toolbar");
  if (!toolbar || document.getElementById("toolbarMore")) return;

  const host = document.createElement("div");
  host.className = "toolbar-more qb-menu-host";
  host.id = "toolbarMore";
  host.innerHTML = `
        <button class="btn btn-sm btn-ghost toolbar-more-btn" id="toolbarMoreBtn" type="button" aria-label="More actions" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"></circle></svg></button>
        <div class="toolbar-menu" id="toolbarMenu">
            <div class="toolbar-menu-label">Actions</div>
        </div>`;
  toolbar.appendChild(host);

  const menu = host.querySelector("#toolbarMenu");
  const items = [
    ["Open .sql", "openFileBtn"],
    ["Save .sql", "saveFileBtn"],
    ["__divider__", ""],
    ["Format", "formatBtn"],
    ["Clear", "clearBtn"],
    ["Run query", "runBtn"],
  ];
  items.forEach(([label, id]) => {
    if (label === "__divider__") {
      const d = document.createElement("div");
      d.className = "toolbar-menu-divider";
      menu.appendChild(d);
      return;
    }
    const item = document.createElement("button");
    item.type = "button";
    item.className = `toolbar-menu-item${id === "runBtn" ? " toolbar-menu-run" : ""}`;
    item.dataset.targetId = id;
    item.textContent = label;
    item.addEventListener("click", () => document.getElementById(id)?.click());
    menu.appendChild(item);
  });

  const divider = document.createElement("div");
  divider.className = "toolbar-menu-divider";
  menu.appendChild(divider);

  ["connections", "chat", "history"].forEach((panel) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "toolbar-menu-item";
    item.dataset.panelAction = panel;
    item.textContent = panel.charAt(0).toUpperCase() + panel.slice(1);
    item.addEventListener("click", () => {
      host.classList.remove("open");
      document.getElementById("toolbarMoreBtn").setAttribute("aria-expanded", "false");
      qbOpenMobilePanel(panel);
    });
    menu.appendChild(item);
  });

  const btn = host.querySelector("#toolbarMoreBtn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    qbCloseMenus(host);
    const open = host.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function qbCreateResultsMenu() {
  const toolbar = document.querySelector(".results-toolbar");
  if (!toolbar || document.getElementById("resultsMore")) return;

  const host = document.createElement("div");
  host.className = "results-more qb-menu-host";
  host.id = "resultsMore";
  host.innerHTML = `
        <button class="btn btn-sm results-more-btn" id="resultsMoreBtn" type="button" aria-label="Result actions" aria-expanded="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"></circle><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"></circle></svg></button>
        <div class="results-menu" id="resultsMenu">
            <div class="results-menu-label">Results</div>
        </div>`;
  toolbar.appendChild(host);
  const menu = host.querySelector("#resultsMenu");

  const add = (label, id) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "results-menu-item";
    item.dataset.targetId = id;
    item.textContent = label;
    item.addEventListener("click", () => document.getElementById(id)?.click());
    menu.appendChild(item);
  };

  add("Table", "viewTableBtn");
  add("JSON", "viewJsonBtn");
  const div1 = document.createElement("div");
  div1.className = "results-menu-divider";
  menu.appendChild(div1);
  add("Copy", "copyResultBtn");
  const div2 = document.createElement("div");
  div2.className = "results-menu-divider";
  menu.appendChild(div2);
  add("Export CSV", "exportCsv");
  add("Export JSON", "exportJson");

  const btn = host.querySelector("#resultsMoreBtn");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    qbCloseMenus(host);
    ["copyResultBtn", "exportCsv", "exportJson"].forEach((id) => {
      const source = document.getElementById(id);
      const item = menu.querySelector(`[data-target-id="${id}"]`);
      if (source && item) item.disabled = source.disabled;
    });
    const open = host.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function qbOpenMobilePanel(panel) {
  const workspace = document.querySelector(".workspace");
  if (!workspace || !qbIsMobile()) return;

  workspace.classList.remove("mobile-panel-connections", "mobile-panel-chat", "mobile-panel-history");
  document.getElementById("sidebarLeft")?.classList.remove("collapsed");
  document.getElementById("sidebarRight")?.classList.remove("collapsed");

  if (panel === "connections") {
    workspace.classList.add("mobile-panel-connections");
  } else if (panel === "chat" || panel === "history") {
    if (typeof setSessionTab === "function") setSessionTab(panel);
    workspace.classList.add(`mobile-panel-${panel}`);
  }

  if (typeof updateSidebarToggleIcons === "function") updateSidebarToggleIcons();
}

function qbCloseMobilePanels() {
  const workspace = document.querySelector(".workspace");
  if (!workspace) return;
  workspace.classList.remove("mobile-panel-connections", "mobile-panel-chat", "mobile-panel-history");
  document.getElementById("sidebarLeft")?.classList.add("collapsed");
  document.getElementById("sidebarRight")?.classList.add("collapsed");
}

function qbPatchPanelCollapseButtons() {
  document.getElementById("toggleLeftSidebar")?.addEventListener("click", () => {
    if (qbIsMobile()) {
      qbCloseMobilePanels();
      return;
    }
  });
  document.getElementById("toggleRightSidebar")?.addEventListener("click", () => {
    if (qbIsMobile()) {
      qbCloseMobilePanels();
      return;
    }
  });
}

function qbInitCustomSelects() {
  document.querySelectorAll("select").forEach((select) => {
    if (select.dataset.qbCustomReady === "1") return;
    select.dataset.qbCustomReady = "1";

    const parent = select.parentElement;
    if (!parent) return;
    const wrap = document.createElement("div");
    wrap.className = `${parent.className || ""} custom-select-wrap`.trim();

    // Preserve existing siblings such as theme/model icons.
    const preservedChildren = Array.from(parent.childNodes).filter((node) => node !== select);
    parent.replaceWith(wrap);
    preservedChildren.forEach((node) => wrap.appendChild(node));
    wrap.appendChild(select);

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "custom-select-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    if (select.id) trigger.id = `${select.id}CustomTrigger`;

    const value = document.createElement("span");
    value.className = "custom-select-value";
    const label = document.createElement("span");
    label.className = "custom-select-label";
    value.appendChild(label);
    const chevron = document.createElement("span");
    chevron.className = "custom-select-chevron";
    chevron.innerHTML = qbSvg("chevronDown", 14) || "⌄";
    trigger.append(value, chevron);

    const menu = document.createElement("div");
    menu.className = "custom-select-menu";
    menu.setAttribute("role", "listbox");
    wrap.append(trigger, menu);
    select.classList.add("custom-select-native");

    const selectedText = () => {
      const opt = select.options[select.selectedIndex];
      return opt ? opt.textContent : "";
    };

    const update = () => {
      label.textContent = selectedText() || "Select…";
      menu.querySelectorAll(".custom-select-option").forEach((item) => {
        const selected = item.dataset.value === select.value;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", selected ? "true" : "false");
      });
    };

    const render = () => {
      const current = select.value;
      menu.innerHTML = "";
      const appendOption = (option) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "custom-select-option";
        item.setAttribute("role", "option");
        item.dataset.value = option.value;
        item.disabled = option.disabled;
        const leadingIcon = getCustomSelectOptionIcon(select.id, option.value);
        item.innerHTML =
          `<span class="custom-select-check">${qbSvg("check", 14) || "✓"}</span>` +
          (leadingIcon ? `<span class="custom-select-option-icon">${leadingIcon}</span>` : "") +
          `<span class="custom-select-option-label"></span>`;
        item.querySelector(".custom-select-option-label").textContent = option.textContent;
        item.classList.toggle("is-selected", option.value === current);
        item.addEventListener("click", () => {
          if (option.disabled) return;
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          close();
        });
        menu.appendChild(item);
      };

      Array.from(select.children).forEach((child) => {
        if (child.tagName === "OPTGROUP") {
          const g = document.createElement("div");
          g.className = "custom-select-group-label";
          g.textContent = child.label;
          menu.appendChild(g);
          Array.from(child.children).forEach(appendOption);
        } else if (child.tagName === "OPTION") {
          appendOption(child);
        }
      });
      update();
    };

    const position = () => {
      const rect = trigger.getBoundingClientRect();
      menu.style.minWidth = `${Math.max(rect.width, 150)}px`;
      const mr = menu.getBoundingClientRect();
      let left = rect.left;
      let top = rect.bottom + 6;
      if (left + mr.width > innerWidth - 8) left = innerWidth - mr.width - 8;
      if (top + mr.height > innerHeight - 8 && rect.top - mr.height - 6 >= 8) top = rect.top - mr.height - 6;
      menu.style.left = `${Math.max(8, left)}px`;
      menu.style.top = `${Math.max(8, top)}px`;
    };

    const close = () => {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      document.querySelectorAll(".custom-select-wrap.open").forEach((w) => {
        if (w !== wrap) {
          w.classList.remove("open");
          w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
        }
      });
      render();
      wrap.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
      requestAnimationFrame(position);
    };

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      wrap.classList.contains("open") ? close() : open();
    });
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
      if (e.key === "Escape") close();
    });
    select.addEventListener("change", update);
    const observer = new MutationObserver(render);
    observer.observe(select, { childList: true, subtree: true });
    window.addEventListener("resize", () => wrap.classList.contains("open") && position());
    window.addEventListener("scroll", () => wrap.classList.contains("open") && position(), true);
    render();
  });
}

function qbSetupResponsiveUI() {
  qbCreateHeaderMenu();
  qbCreateToolbarMenu();
  qbCreateResultsMenu();
  qbBindMobileHeaderSelects();
  qbPatchPanelCollapseButtons();
  qbInitCustomSelects();

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".qb-menu-host")) {
      document.querySelectorAll(".qb-menu-host.open").forEach((el) => el.classList.remove("open"));
    }
    if (!e.target.closest(".custom-select-wrap")) {
      document.querySelectorAll(".custom-select-wrap.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".qb-menu-host.open").forEach((el) => el.classList.remove("open"));
      document.querySelectorAll(".custom-select-wrap.open").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      });
      if (qbIsMobile()) qbCloseMobilePanels();
    }
  });

  window.addEventListener("resize", () => {
    if (!qbIsMobile()) {
      qbCloseMobilePanels();
      if (typeof applyWorkspaceColumns === "function") applyWorkspaceColumns();
    }
  });
}

initTheme();
init()
  .then(() => qbSetupResponsiveUI())
  .catch(() => qbSetupResponsiveUI());
