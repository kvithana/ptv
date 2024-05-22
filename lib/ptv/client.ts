/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface V3Status {
  /** API Version number */
  version?: string;
  /**
   * API system health status (0=offline, 1=online)
   * @format int32
   */
  health?: 0 | 1;
}

/** An error response */
export interface V3ErrorResponse {
  /** Error message */
  message?: string;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3DeparturesBroadParameters {
  /** Filter by platform number at stop */
  platform_numbers?: number[];
  /**
   * Filter by identifier of direction of travel; values returned by Directions API - /v3/directions/route/{route_id}
   * @format int32
   */
  direction_id?: number;
  /** Indicates that stop_id parameter will accept "GTFS stop_id" data */
  gtfs?: boolean;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false)
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /**
   * Maximum number of results returned
   * @format int32
   */
  max_results?: number;
  /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
  include_cancelled?: boolean;
  /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
  look_backwards?: boolean;
  /**
   * List of objects to be returned in full (i.e. expanded) - options include: All, Stop, Route, Run, Direction, Disruption, VehiclePosition, VehicleDescriptor or None.
   * Run must be expanded to receive VehiclePosition and VehicleDescriptor information.
   */
  expand?: (
    | "All"
    | "Stop"
    | "Route"
    | "Run"
    | "Direction"
    | "Disruption"
    | "VehicleDescriptor"
    | "VehiclePosition"
    | "None"
  )[];
  /** Indicates if the route geopath should be returned */
  include_geopath?: boolean;
}

export interface V3DeparturesResponse {
  /** Timetabled and real-time service departures */
  departures?: V3Departure[];
  /** A train station, tram stop, bus stop, regional coach stop or Night Bus stop */
  stops?: Record<string, V3StopModel>;
  /** Train lines, tram routes, bus routes, regional coach routes, Night Bus routes */
  routes?: Record<string, object>;
  /** Individual trips/services of a route */
  runs?: Record<string, V3Run>;
  /** Directions of travel of route */
  directions?: Record<string, V3Direction>;
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: Record<string, V3Disruption>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3Departure {
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Numeric trip/service run identifier. Defaults to -1 when run identifier is Alphanumeric
   * @format int32
   */
  run_id?: number;
  /** Alphanumeric trip/service run identifier */
  run_ref?: string;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Disruption information identifier(s) */
  disruption_ids?: number[];
  /**
   * Scheduled (i.e. timetabled) departure time and date in ISO 8601 UTC format
   * @format date-time
   */
  scheduled_departure_utc?: string;
  /**
   * Real-time estimate of departure time and date in ISO 8601 UTC format
   * @format date-time
   */
  estimated_departure_utc?: string;
  /** Indicates if the metropolitan train service is at the platform at the time of query; returns false for other modes */
  at_platform?: boolean;
  /** Platform number at stop (metropolitan train only; returns null for other modes) */
  platform_number?: string;
  /** Flag indicating special condition for run (e.g. RR Reservations Required, GC Guaranteed Connection, DOO Drop Off Only, PUO Pick Up Only, MO Mondays only, TU Tuesdays only, WE Wednesdays only, TH Thursdays only, FR Fridays only, SS School days only; ignore E flag) */
  flags?: string;
  /**
   * Chronological sequence for the departures in a run. Order ascendingly by this field to get chronological order (earliest first) of departures with the same run_ref. NOTE, this field is not always N+1 or N-1 of the previous or following departure. e.g 100, 200, 250, 300 instead of 1, 2, 3, 4
   * @format int32
   */
  departure_sequence?: number;
}

export interface V3StopModel {
  /**
   * Distance of stop from input location (in metres); returns 0 if no location is input
   * @format float
   */
  stop_distance?: number;
  /** suburb of stop */
  stop_suburb?: string;
  /** Name of stop */
  stop_name?: string;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
  /**
   * Sequence of the stop on the route/run; return 0 when route_id or run_id not specified. Order ascendingly by this field (when non zero) to get physical order (earliest first) of stops on the route_id/run_id.
   * @format int32
   */
  stop_sequence?: number;
}

export interface V3Run {
  /**
   * Numeric trip/service run identifier. Defaults to -1 when run identifier is Alphanumeric
   * @format int32
   */
  run_id?: number;
  /** Alphanumeric trip/service run identifier */
  run_ref?: string;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * stop_id of final stop of run
   * @format int32
   */
  final_stop_id?: number;
  /** Name of destination of run */
  destination_name?: string;
  /** Status of metropolitan train run; returns "scheduled" for other modes */
  status?: string;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /**
   * Chronological sequence of the trip/service run on the route in direction. Order ascendingly by this field to get chronological order (earliest first) of runs with the same route_id and direction_id.
   * @format int32
   */
  run_sequence?: number;
  /**
   * The number of remaining skipped/express stations for the run/service from a stop
   * @format int32
   */
  express_stop_count?: number;
  /** Position of the trip/service run. Available for some Bus, Nightrider and Train runs. May be null. */
  vehicle_position?: V3VehiclePosition;
  /** Descriptor of the trip/service run. Only available for some runs. May be null. */
  vehicle_descriptor?: V3VehicleDescriptor;
  /** Geopath of the route */
  geopath?: object[];
  /** Connection link between two runs */
  interchange?: V3Interchange;
}

export interface V3Direction {
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Name of direction of travel */
  direction_name?: string;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
}

export interface V3Disruption {
  /**
   * Disruption information identifier
   * @format int64
   */
  disruption_id?: number;
  /** Headline title summarising disruption information */
  title?: string;
  /** URL of relevant article on PTV website */
  url?: string;
  /** Description of the disruption */
  description?: string;
  /** Status of the disruption (e.g. "Planned", "Current") */
  disruption_status?: string;
  /** Type of disruption */
  disruption_type?: string;
  /**
   * Date and time disruption information is published on PTV website, in ISO 8601 UTC format
   * @format date-time
   */
  published_on?: string;
  /**
   * Date and time disruption information was last updated by PTV, in ISO 8601 UTC format
   * @format date-time
   */
  last_updated?: string;
  /**
   * Date and time at which disruption begins, in ISO 8601 UTC format
   * @format date-time
   */
  from_date?: string;
  /**
   * Date and time at which disruption ends, in ISO 8601 UTC format (returns null if unknown)
   * @format date-time
   */
  to_date?: string;
  /** Route relevant to a disruption (if applicable) */
  routes?: V3DisruptionRoute[];
  /** Stop relevant to a disruption (if applicable) */
  stops?: V3DisruptionStop[];
  colour?: string;
  display_on_board?: boolean;
  display_status?: boolean;
}

export interface V3VehiclePosition {
  /**
   * Geographic coordinate of latitude of the vehicle when known. May be null.
   * Only available for some bus runs.
   * @format double
   */
  latitude?: number;
  /**
   * Geographic coordinate of longitude of the vehicle when known.
   * Only available for some bus runs.
   * @format double
   */
  longitude?: number;
  /**
   * CIS - Metro Train Vehicle Location Easting coordinate
   * @format double
   */
  easting?: number;
  /**
   * CIS - Metro Train Vehicle Location Northing coordinate
   * @format double
   */
  northing?: number;
  /** CIS - Metro Train Vehicle Location Direction */
  direction?: string;
  /**
   * Compass bearing of the vehicle when known, clockwise from True North, i.e., 0 is North and 90 is East. May be null.
   * Only available for some bus runs.
   * @format double
   */
  bearing?: number;
  /** Supplier of vehicle position data. */
  supplier?: string;
  /**
   * Date and time that the vehicle position data was supplied.
   * @format date-time
   */
  datetime_utc?: string;
  /**
   * CIS - Metro Train Vehicle Location data expiry time
   * @format date-time
   */
  expiry_time?: string;
}

export interface V3VehicleDescriptor {
  /**
   * Operator name of the vehicle such as "Metro Trains Melbourne", "Yarra Trams", "Ventura Bus Line", "CDC" or "Sita Bus Lines" . May be null/empty.
   * Only available for train, tram, v/line and some bus runs.
   */
  operator?: string;
  /** Operator identifier of the vehicle such as "26094". May be null/empty. Only available for some tram and bus runs. */
  id?: string;
  /** Indicator if vehicle has a low floor. May be null. Only available for some tram runs. */
  low_floor?: boolean;
  /** Indicator if vehicle is air conditioned. May be null. Only available for some tram runs. */
  air_conditioned?: boolean;
  /**
   * Vehicle description such as "6 Car Comeng", "6 Car Xtrapolis", "3 Car Comeng", "6 Car Siemens", "3 Car Siemens". May be null/empty.
   * Only available for some metropolitan train runs.
   */
  description?: string;
  /** Supplier of vehicle descriptor data. */
  supplier?: string;
  /** The length of the vehicle. Applies to CIS - Metro Trains */
  length?: string;
}

/** When two runs connect */
export interface V3Interchange {
  /** The run that a vehicle was previously on */
  feeder?: V3InterchangeRun;
  /** The run that a vehicle will become */
  distributor?: V3InterchangeRun;
}

export interface V3DisruptionRoute {
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /** Name of route */
  route_name?: string;
  /** Route number presented to public (i.e. not route_id) */
  route_number?: string;
  /** GTFS Identifer of the route */
  route_gtfs_id?: string;
  /** Direction of travel relevant to a disruption (if applicable) */
  direction?: V3DisruptionDirection;
}

export interface V3DisruptionStop {
  /** @format int32 */
  stop_id?: number;
  stop_name?: string;
}

/** Feeder / Distributor details */
export interface V3InterchangeRun {
  /** Run Identifier */
  run_ref?: string;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /** Indicates whether the interchange information is shown to end users */
  advertised?: boolean;
}

export interface V3DisruptionDirection {
  /**
   * Route and direction of travel combination identifier
   * @format int32
   */
  route_direction_id?: number;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Name of direction of travel */
  direction_name?: string;
  /** Time of service to which disruption applies, in 24 hour clock format (HH:MM:SS) AEDT/AEST; returns null if disruption applies to multiple (or no) services */
  service_time?: string;
}

export interface V3DeparturesSpecificParameters {
  /**
   * Filter by identifier of direction of travel; values returned by Directions API - /v3/directions/route/{route_id}
   * @format int32
   */
  direction_id?: number;
  /** Indicates that stop_id parameter will accept "GTFS stop_id" data */
  gtfs?: boolean;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false)
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /**
   * Maximum number of results returned
   * @format int32
   */
  max_results?: number;
  /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
  include_cancelled?: boolean;
  /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
  look_backwards?: boolean;
  /**
   * List of objects to be returned in full (i.e. expanded) - options include: All, Stop, Route, Run, Direction, Disruption, VehiclePosition, VehicleDescriptor or None.
   * Run must be expanded to receive VehiclePosition and VehicleDescriptor information.
   */
  expand?: (
    | "All"
    | "Stop"
    | "Route"
    | "Run"
    | "Direction"
    | "Disruption"
    | "VehicleDescriptor"
    | "VehiclePosition"
    | "None"
  )[];
  /** Indicates if the route geopath should be returned */
  include_geopath?: boolean;
}

export interface V3RouteDeparturesSpecificParameters {
  /** DEPRECATED - use `scheduled_timetables` instead */
  train_scheduled_timetables?: boolean;
  /**
   * When set to true, all timetable information returned by Chronos will be sourced from the scheduled timetables,
   * while when set to false (default state), the operational timetables will be used where available.
   */
  scheduled_timetables?: boolean;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false)
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /**
   * Maximum number of results returned
   * @format int32
   */
  max_results?: number;
  /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
  include_cancelled?: boolean;
  /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
  look_backwards?: boolean;
  /**
   * List of objects to be returned in full (i.e. expanded) - options include: All, Stop, Route, Run, Direction, Disruption, VehiclePosition, VehicleDescriptor or None.
   * Run must be expanded to receive VehiclePosition and VehicleDescriptor information.
   */
  expand?: (
    | "All"
    | "Stop"
    | "Route"
    | "Run"
    | "Direction"
    | "Disruption"
    | "VehicleDescriptor"
    | "VehiclePosition"
    | "None"
  )[];
  /** Indicates if the route geopath should be returned */
  include_geopath?: boolean;
}

export interface V3BulkDeparturesRequest {
  /** Collection of departure requests */
  requests: V3StopDepartureRequest[];
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
  look_backwards?: boolean;
  /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
  include_cancelled?: boolean;
  /** Indicates if the route geopath should be returned */
  include_geopath?: boolean;
  /** List objects to be returned in full (i.e. expanded) - options include: all, stop, route, run, direction, disruption, none */
  expand?: (
    | "All"
    | "Stop"
    | "Route"
    | "Run"
    | "Direction"
    | "Disruption"
    | "VehicleDescriptor"
    | "VehiclePosition"
    | "None"
  )[];
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false)
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
}

export interface V3StopDepartureRequest {
  /**
   * Number identifying transport mode; values returned via RouteTypes API
   * @format int32
   */
  route_type?: 0 | 1 | 2 | 3 | 4;
  /**
   * Identifier of stop; values returned by Stops API
   * @format int32
   * @min 0
   * @max 2147483647
   */
  stop_id?: number;
  /**
   * Maximum number of results returned
   * @format int32
   * @min 0
   * @max 2147483647
   */
  max_results?: number;
  /** Indicates that stop_id parameter will accept "GTFS stop_id" data and route_directions[x].route_id parameters will accept route_gtfs_id data */
  gtfs?: boolean;
  /** The route directions to find departures for at this stop. */
  route_directions: V3StopDepartureRequestRouteDirection[];
}

export interface V3StopDepartureRequestRouteDirection {
  /** Identifier of route; values returned by Routes API - v3/routes */
  route_id?: string;
  /**
   * Direction of travel identifier; values returned by Directions API - v3/directions
   * @format int32
   * @min 0
   * @max 2147483647
   */
  direction_id?: number;
  /** Name of direction of travel; values returned by Directions API - v3/directions */
  direction_name: string;
}

export interface V3BulkDeparturesResponse {
  /** Contains departures for the requested stop and route(s). It includes details as to the route_direction and whether it is still valid. */
  responses?: V3BulkDeparturesUpdateResponse[];
  /** A train station, tram stop, bus stop, regional coach stop or Night Bus stop */
  stops?: Record<string, V3BulkDeparturesStopResponse>;
  /** Train lines, tram routes, bus routes, regional coach routes, Night Bus routes */
  routes?: object[];
  /** Individual trips/services of a route */
  runs?: V3Run[];
  /** Directions of travel of route */
  directions?: V3Direction[];
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: Record<string, V3Disruption>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3BulkDeparturesUpdateResponse {
  /** Timetabled and real-time service departures */
  departures?: V3Departure[];
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /** The route direction that these departures are for. Will be one of the requested route directions */
  requested_route_direction?: V3BulkDeparturesRouteDirectionResponse;
  /**
   * The status of the route direction (changed | unchanged).
   * If changed, requests should change the requested_route_direction for the route_direction supplied.
   * @format int32
   */
  route_direction_status?: 0 | 1;
  /** The route direction found matching the requested_route_direction */
  route_direction?: V3BulkDeparturesRouteDirectionResponse;
}

export interface V3BulkDeparturesStopResponse {
  /** Name of stop */
  stop_name?: string;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /** suburb of stop */
  stop_suburb?: string;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
}

export interface V3BulkDeparturesRouteDirectionResponse {
  /** Route identifier */
  route_id?: string;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Name of direction of travel */
  direction_name?: string;
}

export interface V3DirectionsResponse {
  /** Directions of travel of route */
  directions?: V3DirectionWithDescription[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3DirectionWithDescription {
  route_direction_description?: string;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Name of direction of travel */
  direction_name?: string;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
}

export interface V3DisruptionsResponse {
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: V3Disruptions;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3Disruptions {
  /** Subset of disruption information applicable to multiple route_types */
  general?: V3Disruption[];
  /** Subset of disruption information applicable to metropolitan train */
  metro_train?: V3Disruption[];
  /** Subset of disruption information applicable to metropolitan tram */
  metro_tram?: V3Disruption[];
  /** Subset of disruption information applicable to metropolitan bus */
  metro_bus?: V3Disruption[];
  /** Subset of disruption information applicable to V/Line train */
  regional_train?: V3Disruption[];
  /** Subset of disruption information applicable to V/Line coach */
  regional_coach?: V3Disruption[];
  /** Subset of disruption information applicable to regional bus */
  regional_bus?: V3Disruption[];
  /** Subset of disruption information applicable to school bus */
  school_bus?: V3Disruption[];
  /** Subset of disruption information applicable to telebus services */
  telebus?: V3Disruption[];
  /** Subset of disruption information applicable to night bus */
  night_bus?: V3Disruption[];
  /** Subset of disruption information applicable to ferry */
  ferry?: V3Disruption[];
  /** Subset of disruption information applicable to interstate train */
  interstate_train?: V3Disruption[];
  /** Subset of disruption information applicable to skybus */
  skybus?: V3Disruption[];
  /** Subset of disruption information applicable to taxi */
  taxi?: V3Disruption[];
}

export interface V3DisruptionResponse {
  /** Disruption information applicable to relevant routes or stops */
  disruption?: V3Disruption;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3StopBasic {
  /** @format int32 */
  stop_id?: number;
  stop_name?: string;
}

export interface V3DisruptionModesResponse {
  /** Transport mode identifiers */
  disruption_modes?: V3DisruptionMode[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3DisruptionMode {
  /** Name of disruption mode */
  disruption_mode_name?: string;
  /**
   * Disruption mode identifier
   * @format int32
   */
  disruption_mode?: number;
}

export interface V3StopTicket {
  /** Indicates the ticket type for the stop (myki, paper or both) */
  ticket_type?: string;
  /** Description of the zone */
  zone?: string;
  /** Indicates whether the stop is inside the free fare zone */
  is_free_fare_zone?: boolean;
  ticket_machine?: boolean;
  ticket_checks?: boolean;
  vline_reservation?: boolean;
  ticket_zones?: number[];
}

export interface V3OutletParameters {
  /**
   * Maximum number of results returned (default = 30)
   * @format int32
   */
  max_results?: number;
}

export interface V3OutletResponse {
  /** myki ticket outlets */
  outlets?: V3Outlet[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3Outlet {
  /** The SLID / SPID */
  outlet_slid_spid?: string;
  /** The location name of the outlet */
  outlet_name?: string;
  /** The business name of the outlet */
  outlet_business?: string;
  /**
   * Geographic coordinate of latitude at outlet
   * @format float
   */
  outlet_latitude?: number;
  /**
   * Geographic coordinate of longitude at outlet
   * @format float
   */
  outlet_longitude?: number;
  /** The city/municipality the outlet is in */
  outlet_suburb?: string;
  /**
   * The postcode for the outlet
   * @format int32
   */
  outlet_postcode?: number;
  /** The business hours on Monday */
  outlet_business_hour_mon?: string;
  /** The business hours on Tuesday */
  outlet_business_hour_tue?: string;
  /** The business hours on Wednesday */
  outlet_business_hour_wed?: string;
  /** The business hours on Thursday */
  outlet_business_hour_thur?: string;
  /** The business hours on Friday */
  outlet_business_hour_fri?: string;
  /** The business hours on Saturday */
  outlet_business_hour_sat?: string;
  /** The business hours on Sunday */
  outlet_business_hour_sun?: string;
  /** Any additional notes for the outlet such as 'Buy pre-loaded myki cards only'. May be null/empty. */
  outlet_notes?: string;
}

export interface V3OutletGeolocationParameters {
  /**
   * Filter by maximum distance (in metres) from location specified via latitude and longitude parameters (default = 300)
   * @format double
   */
  max_distance?: number;
  /**
   * Maximum number of results returned (default = 30)
   * @format int32
   */
  max_results?: number;
}

export interface V3OutletGeolocationResponse {
  /** myki ticket outlets */
  outlets?: V3OutletGeolocation[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3OutletGeolocation {
  /**
   * Distance of outlet from input location (in metres); returns 0 if no location is input
   * @format float
   */
  outlet_distance?: number;
  /** The SLID / SPID */
  outlet_slid_spid?: string;
  /** The location name of the outlet */
  outlet_name?: string;
  /** The business name of the outlet */
  outlet_business?: string;
  /**
   * Geographic coordinate of latitude at outlet
   * @format float
   */
  outlet_latitude?: number;
  /**
   * Geographic coordinate of longitude at outlet
   * @format float
   */
  outlet_longitude?: number;
  /** The city/municipality the outlet is in */
  outlet_suburb?: string;
  /**
   * The postcode for the outlet
   * @format int32
   */
  outlet_postcode?: number;
  /** The business hours on Monday */
  outlet_business_hour_mon?: string;
  /** The business hours on Tuesday */
  outlet_business_hour_tue?: string;
  /** The business hours on Wednesday */
  outlet_business_hour_wed?: string;
  /** The business hours on Thursday */
  outlet_business_hour_thur?: string;
  /** The business hours on Friday */
  outlet_business_hour_fri?: string;
  /** The business hours on Saturday */
  outlet_business_hour_sat?: string;
  /** The business hours on Sunday */
  outlet_business_hour_sun?: string;
  /** Any additional notes for the outlet such as 'Buy pre-loaded myki cards only'. May be null/empty. */
  outlet_notes?: string;
}

export interface V3PatternsParameters {
  /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
  expand?: (
    | "All"
    | "Stop"
    | "Route"
    | "Run"
    | "Direction"
    | "Disruption"
    | "VehicleDescriptor"
    | "VehiclePosition"
    | "None"
  )[];
  /**
   * Filter by stop_id; values returned by Stops API
   * @format int32
   */
  stop_id?: number;
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /** Indicates if geopath data will be returned (default = false) */
  include_skipped_stops?: boolean;
  /** Indicates if geopath data will be returned (default = false) */
  include_geopath?: boolean;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false)
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
}

export interface V3StoppingPattern {
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: V3Disruption[];
  /** Timetabled and real-time service departures */
  departures?: V3PatternDeparture[];
  /** A train station, tram stop, bus stop, regional coach stop or Night Bus stop */
  stops?: Record<string, V3StoppingPatternStop>;
  /** Train lines, tram routes, bus routes, regional coach routes, Night Bus routes */
  routes?: Record<string, object>;
  /** Individual trips/services of a route */
  runs?: Record<string, V3Run>;
  /** Directions of travel of route */
  directions?: Record<string, V3Direction>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3PatternDeparture {
  /** The stops to be skipped following the current departure in order. */
  skipped_stops?: V3StopModel[];
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /**
   * Numeric trip/service run identifier. Defaults to -1 when run identifier is Alphanumeric
   * @format int32
   */
  run_id?: number;
  /** Alphanumeric trip/service run identifier */
  run_ref?: string;
  /**
   * Direction of travel identifier
   * @format int32
   */
  direction_id?: number;
  /** Disruption information identifier(s) */
  disruption_ids?: number[];
  /**
   * Scheduled (i.e. timetabled) departure time and date in ISO 8601 UTC format
   * @format date-time
   */
  scheduled_departure_utc?: string;
  /**
   * Real-time estimate of departure time and date in ISO 8601 UTC format
   * @format date-time
   */
  estimated_departure_utc?: string;
  /** Indicates if the metropolitan train service is at the platform at the time of query; returns false for other modes */
  at_platform?: boolean;
  /** Platform number at stop (metropolitan train only; returns null for other modes) */
  platform_number?: string;
  /** Flag indicating special condition for run (e.g. RR Reservations Required, GC Guaranteed Connection, DOO Drop Off Only, PUO Pick Up Only, MO Mondays only, TU Tuesdays only, WE Wednesdays only, TH Thursdays only, FR Fridays only, SS School days only; ignore E flag) */
  flags?: string;
  /**
   * Chronological sequence for the departures in a run. Order ascendingly by this field to get chronological order (earliest first) of departures with the same run_ref. NOTE, this field is not always N+1 or N-1 of the previous or following departure. e.g 100, 200, 250, 300 instead of 1, 2, 3, 4
   * @format int32
   */
  departure_sequence?: number;
}

export interface V3StoppingPatternStop {
  /** Stop ticket information */
  stop_ticket?: V3StopTicket;
  /**
   * Distance of stop from input location (in metres); returns 0 if no location is input
   * @format float
   */
  stop_distance?: number;
  /** suburb of stop */
  stop_suburb?: string;
  /** Name of stop */
  stop_name?: string;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
  /**
   * Sequence of the stop on the route/run; return 0 when route_id or run_id not specified. Order ascendingly by this field (when non zero) to get physical order (earliest first) of stops on the route_id/run_id.
   * @format int32
   */
  stop_sequence?: number;
}

export interface V3RouteResponse {
  /** Train lines, tram routes, bus routes, regional coach routes, Night Bus routes */
  route?: V3RouteWithStatus;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3RouteWithStatus {
  /** Service status for the route (indicates disruptions) */
  route_service_status?: V3RouteServiceStatus;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /** Name of route */
  route_name?: string;
  /** Route number presented to public (nb. not route_id) */
  route_number?: string;
  /** GTFS Identifer of the route */
  route_gtfs_id?: string;
  /** GeoPath of the route */
  geopath?: object[];
}

export interface V3RouteServiceStatus {
  description?: string;
  /** @format date-time */
  timestamp?: string;
}

export interface V3RouteTypesResponse {
  /** Transport mode identifiers */
  route_types?: V3RouteType[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3RouteType {
  /** Name of transport mode */
  route_type_name?: string;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
}

export interface V3RunsBroadParameters {
  /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
  expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false).
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
}

export interface V3RunsResponse {
  /** Individual trips/services of a route */
  runs?: V3Run[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3RunsSpecificParameters {
  /** Indicates if geopath data will be returned (default = false) */
  include_geopath?: boolean;
  /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
  expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /**
   * Indicates whether data related to interchanges should be included in the response (default = false).
   * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
   */
  include_advertised_interchange?: boolean;
}

export interface V3RunAndRouteTypeParameters {
  /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
  expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /** Indicates if geopath data will be returned (default = false) */
  include_geopath?: boolean;
}

export interface V3RunResponse {
  /** Individual trip/service of a route */
  run?: V3Run;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3SearchParameters {
  /** Filter by route_type; values returned via RouteTypes API (note: stops and routes are ordered by route_types specified) */
  route_types?: (0 | 1 | 2 | 3 | 4)[];
  /**
   * Filter by geographic coordinate of latitude
   * @format float
   */
  latitude?: number;
  /**
   * Filter by geographic coordinate of longitude
   * @format float
   */
  longitude?: number;
  /**
   * Filter by maximum distance (in metres) from location specified via latitude and longitude parameters
   * @format float
   */
  max_distance?: number;
  /** Placeholder for future development; currently unavailable */
  include_addresses?: boolean;
  /** Indicates if outlets will be returned in response (default = true) */
  include_outlets?: boolean;
  /** Indicates whether to find stops by suburbs in the search term (default = true) */
  match_stop_by_suburb?: boolean;
  /** Indicates whether to find routes by suburbs in the search term (default = true) */
  match_route_by_suburb?: boolean;
  /** Indicates whether to search for stops according to a metlink stop ID (default = false) */
  match_stop_by_gtfs_stop_id?: boolean;
}

export interface V3SearchResult {
  /** Train stations, tram stops, bus stops, regional coach stops or Night Bus stops */
  stops?: V3ResultStop[];
  /** Train lines, tram routes, bus routes, regional coach routes, Night Bus routes */
  routes?: V3ResultRoute[];
  /** myki ticket outlets */
  outlets?: V3ResultOutlet[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3ResultStop {
  /**
   * Distance of stop from input location (in metres); returns 0 if no location is input
   * @format float
   */
  stop_distance?: number;
  /** suburb of stop */
  stop_suburb?: string;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /** List of routes travelling through the stop */
  routes?: V3ResultRoute[];
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /**
   * Sequence of the stop on the route/run; return 0 when route_id or run_id not specified. Order ascendingly by this field (when non zero) to get physical order (earliest first) of stops on the route_id/run_id.
   * @format int32
   */
  stop_sequence?: number;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /** Name of stop */
  stop_name?: string;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
}

export interface V3ResultRoute {
  /** Name of route */
  route_name?: string;
  /** Route number presented to public (nb. not route_id) */
  route_number?: string;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /** GTFS Identifer of the route */
  route_gtfs_id?: string;
  /** Service status for the route (indicates disruptions) */
  route_service_status?: V3RouteServiceStatus;
}

export interface V3ResultOutlet {
  /**
   * Distance of outlet from input location (in metres); returns 0 if no location is input
   * @format float
   */
  outlet_distance?: number;
  /** The SLID / SPID */
  outlet_slid_spid?: string;
  /** The location name of the outlet */
  outlet_name?: string;
  /** The business name of the outlet */
  outlet_business?: string;
  /**
   * Geographic coordinate of latitude at outlet
   * @format float
   */
  outlet_latitude?: number;
  /**
   * Geographic coordinate of longitude at outlet
   * @format float
   */
  outlet_longitude?: number;
  /** The city/municipality the outlet is in */
  outlet_suburb?: string;
  /**
   * The postcode for the outlet
   * @format int32
   */
  outlet_postcode?: number;
  /** The business hours on Monday */
  outlet_business_hour_mon?: string;
  /** The business hours on Tuesday */
  outlet_business_hour_tue?: string;
  /** The business hours on Wednesday */
  outlet_business_hour_wed?: string;
  /** The business hours on Thursday */
  outlet_business_hour_thur?: string;
  /** The business hours on Friday */
  outlet_business_hour_fri?: string;
  /** The business hours on Saturday */
  outlet_business_hour_sat?: string;
  /** The business hours on Sunday */
  outlet_business_hour_sun?: string;
  /** Any additional notes for the outlet such as 'Buy pre-loaded myki cards only'. May be null/empty. */
  outlet_notes?: string;
}

export interface V3GenerateDivaMappingResponse {
  mapping_version?: string;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3SiriReferenceDataRequest {
  line_refs: V3SiriLineRefDirectionRefStopPointRef[];
  /** Siri StopPointRef */
  stop_point_refs?: number[];
  /**
   * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
   * @format date-time
   */
  date_utc?: string;
  /** DIVA mapping version generated by Chronos during a Parser or RealtimeBusConfig load */
  mapping_version: string;
}

export interface V3SiriLineRefDirectionRefStopPointRef {
  /** Siri LineRef */
  line_ref: string;
  /**
   * Siri DirectionRef  (in, out, up, down, clockwise, counterclockwise, Inbound, Outbound)
   * @format int32
   */
  direction_ref: 1 | 2 | 5 | 10 | 16 | 32 | 65 | 130;
  /**
   * Siri StopPointRef
   * @format int32
   */
  stop_point_ref: number;
}

export interface V3SiriReferenceDataMappingsResponse {
  mapping_version?: string;
  /** SIRI LineRef */
  line_refs?: Record<string, V3SiriDirectionRefsDictionary>;
  stop_point_refs?: Record<string, V3StopPoint>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3SiriDirectionRefsDictionary {
  direction_refs?: Record<string, V3SiriStopsRefsDictionary>;
}

export interface V3StopPoint {
  /** @format int32 */
  stop_id?: number;
}

export interface V3SiriStopsRefsDictionary {
  stop_point_refs?: Record<string, V3SiriReferenceDataDetail>;
  unmatched_stop_point_refs?: Record<string, string>;
}

export interface V3SiriReferenceDataDetail {
  /** @format int32 */
  route_id?: number;
  /** Route number */
  route_number_short?: string;
  /** @format int32 */
  direction_id?: number;
  /**
   * Authority (Upstream SIRI provider) of a route and direction
   * @format int32
   */
  tracking_supplier_id?: number;
  /** @format int32 */
  route_type?: number;
}

export interface V3SiriLineRefsRequest {
  line_refs?: V3SiriLineRef[];
  /** DIVA mapping version generated by Chronos during a Parser or RealtimeBusConfig load */
  mapping_version: string;
}

export interface V3SiriLineRef {
  /** Siri LineRef */
  line_ref: string;
  /**
   * Siri DirectionRef  (in, out, up, down, clockwise, counterclockwise, Inbound, Outbound)
   * @format int32
   */
  direction_ref?: 1 | 2 | 5 | 10 | 16 | 32 | 65 | 130;
}

export interface V3SiriLineRefMappingsResponse {
  mapping_version?: string;
  line_refs?: Record<string, V3SiriLineRefDirectionRefsDictionary>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3SiriLineRefDirectionRefsDictionary {
  direction_refs?: Record<string, V3SiriReferenceDataDetail[]>;
  unmatched_direction_refs?: Record<string, string>;
}

export interface V3DynamoDbTimetablesReponse {
  timetables?: V3DynamoDbTimetable[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3DynamoDbTimetable {
  /** Name of corresponding table in DynamoDB. */
  table_name?: string;
  /**
   * Parser verison
   * @format int64
   */
  parser_version?: number;
  /** Diva Mapping Version used to load Parser into DynamoDB */
  parser_mapping_version?: string;
  /**
   * PT version
   * @format int64
   */
  pt_version?: number;
  /** Diva Mapping Version used to load PT into DynamoDB */
  pt_mapping_version?: string;
  /**
   * A.k.a. Transport Mode (e.g. Train, Tram, Bus, V/Line, Nightrider)
   * @format int32
   */
  transport_type?: 0 | 1 | 2 | 3 | 4;
  /** Formated date string of applicable date */
  applicable_local_date?: string;
  /**
   * True if the named table has been created in DynamoDB (i.e. at least one departure record has been loaded),
   * or false if there are no records for this date and transport type.
   */
  exists?: boolean;
}

export interface V3SiriDownstreamSubscription {
  subscriber_ref?: string;
  subscription_ref?: string;
  /** @format int32 */
  message_type?: 0 | 1;
  /** @format int32 */
  siri_format?: 0 | 1;
  /** @pattern 1.3|2.0 */
  siri_version?: string;
  consumer_address?: string;
  /** @format date-time */
  initial_termination_time?: string;
  /** @format date-time */
  validity_period_start?: string;
  /** @format date-time */
  validity_period_end?: string;
  preview_interval?: string;
  topics?: V3SiriDownstreamSubscriptionTopic[];
}

export interface V3SiriDownstreamSubscriptionTopic {
  line_ref?: string;
  /** @format int32 */
  direction_ref?: 1 | 2 | 5 | 10 | 16 | 32 | 65 | 130;
  /** @format int32 */
  route_type?: 0 | 1 | 2 | 3 | 4;
}

export interface V3SiriProductionTimetableSubscriptionRequest {
  /**
   * Siri Start Time of the Validity Period
   * @format date-time
   */
  start_time: string;
  /**
   * Siri End Time of the Validity Period
   * @format date-time
   */
  end_time: string;
  /** Siri Subscriber Ref */
  subscriber_ref: string;
  /** Siri Subscription Ref - Unique to a Subscriber Ref */
  subscription_ref: string;
  /**
   * Siri Message Format 'xml' or 'json'
   * @format int32
   */
  siri_format: 0 | 1;
  /**
   * Siri Message Version '1.3' or '2.0'
   * @pattern 1.3|2.0
   */
  siri_version: string;
  /** Siri Consumer Address - Baseline and Updates will be sent to this address */
  consumer_address: string;
  /**
   * Siri Initial Termination Time - Expiry of the subscription
   * @format date-time
   */
  initial_termination_time: string;
  topics: V3SiriSubscriptionTopic[];
}

export interface V3SiriSubscriptionTopic {
  /** Siri LineRef */
  line_ref: string;
  /**
   * Siri DirectionRef  (in, out, up, down, clockwise, counterclockwise, Inbound, Outbound)
   * @format int32
   */
  direction_ref?: 1 | 2 | 5 | 10 | 16 | 32 | 65 | 130;
  /**
   * Route Type eg. 0 (Train) 1 (Tram) 2 (Bus) 3 (Vline) 4 (NightRider)
   * @format int32
   */
  route_type: 0 | 1 | 2 | 3 | 4;
}

export interface V3SiriDownstreamSubscriptionResponse {
  /**
   * The Data Horizon of Chronos
   * @format date-time
   */
  valid_until?: string;
}

export interface V3SiriEstimatedTimetableSubscriptionRequest {
  /** Siri Preview Interval */
  preview_interval: string;
  /** Siri Subscriber Ref */
  subscriber_ref: string;
  /** Siri Subscription Ref - Unique to a Subscriber Ref */
  subscription_ref: string;
  /**
   * Siri Message Format 'xml' or 'json'
   * @format int32
   */
  siri_format: 0 | 1;
  /**
   * Siri Message Version '1.3' or '2.0'
   * @pattern 1.3|2.0
   */
  siri_version: string;
  /** Siri Consumer Address - Baseline and Updates will be sent to this address */
  consumer_address: string;
  /**
   * Siri Initial Termination Time - Expiry of the subscription
   * @format date-time
   */
  initial_termination_time: string;
  topics: V3SiriSubscriptionTopic[];
}

export interface V3SiriDownstreamSubscriptionDeleteRequest {
  /** Siri Subscriber Ref */
  subscriber_ref: string;
  /**
   * Siri Subscription Reference(s) - Unique to a Subscriber Ref.
   * If `null`, then all subscriptions will be terminated for the referenced Subscriber.
   */
  subscription_ref?: string[];
}

export type V3Void = object;

export interface V3StopResponse {
  /** A metropolitan or V/Line train station */
  stop?: V3StopDetails;
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: Record<string, V3Disruption>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3StopDetails {
  /** Disruption information identifier(s) */
  disruption_ids?: number[];
  /** Type of metropolitan train station (i.e. "Premium", "Host" or "Unstaffed" station); returns null for V/Line train */
  station_type?: string;
  /** The definition applicable to the station_type; returns null for V/Line train */
  station_description?: string;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /** Location details of the stop */
  stop_location?: V3StopLocation;
  /** Amenity and facility details at the stop */
  stop_amenities?: V3StopAmenityDetails;
  /** Facilities relating to the accessibility of the stop */
  stop_accessibility?: V3StopAccessibility;
  /** Staffing details for the stop */
  stop_staffing?: V3StopStaffing;
  /** Routes travelling through the stop */
  routes?: object[];
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /** Name of stop */
  stop_name?: string;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
}

export interface V3StopLocation {
  /** GPS coordinates of the stop */
  gps?: V3StopGps;
}

export interface V3StopAmenityDetails {
  /** Indicates if there is a public toilet at or near the stop */
  toilet?: boolean;
  /** Indicates if there is a taxi rank at or near the stop */
  taxi_rank?: boolean;
  /** The number of free car parking spots at the stop */
  car_parking?: string;
  /** Indicates if there are CCTV (i.e. closed circuit television) cameras at the stop */
  cctv?: boolean;
}

export interface V3StopAccessibility {
  /** Indicates if there is lighting at the stop */
  lighting?: boolean;
  /**
   * Indicates the platform number for xivic information (Platform 0 indicates general stop facilities)
   * @format int32
   */
  platform_number?: number;
  /** Indicates if there is at least one audio customer information at the stop/platform */
  audio_customer_information?: boolean;
  /** Indicates if there is at least one accessible escalator at the stop/platform that complies with the Disability Standards for Accessible Public Transport under the Disability Discrimination Act (1992) */
  escalator?: boolean;
  /** Indicates if there is a hearing loop facility at the stop/platform */
  hearing_loop?: boolean;
  /** Indicates if there is an elevator at the stop/platform */
  lift?: boolean;
  /** Indicates if there are stairs available in the stop */
  stairs?: boolean;
  /** Indicates if the stop is accessible */
  stop_accessible?: boolean;
  /** Indicates if there are tactile tiles (also known as tactile ground surface indicators, or TGSIs) at the stop */
  tactile_ground_surface_indicator?: boolean;
  /** Indicates if there is a general waiting area at the stop */
  waiting_room?: boolean;
  /** Facilities relating to the accessibility of the stop by wheelchair */
  wheelchair?: V3StopAccessibilityWheelchair;
}

export interface V3StopStaffing {
  /** Stop staffing hours */
  fri_am_from?: string;
  /** Stop staffing hours */
  fri_am_to?: string;
  /** Stop staffing hours */
  fri_pm_from?: string;
  /** Stop staffing hours */
  fri_pm_to?: string;
  /** Stop staffing hours */
  mon_am_from?: string;
  /** Stop staffing hours */
  mon_am_to?: string;
  /** Stop staffing hours */
  mon_pm_from?: string;
  /** Stop staffing hours */
  mon_pm_to?: string;
  /** Stop staffing hours */
  ph_additional_text?: string;
  /** Stop staffing hours */
  ph_from?: string;
  /** Stop staffing hours */
  ph_to?: string;
  /** Stop staffing hours */
  sat_am_from?: string;
  /** Stop staffing hours */
  sat_am_to?: string;
  /** Stop staffing hours */
  sat_pm_from?: string;
  /** Stop staffing hours */
  sat_pm_to?: string;
  /** Stop staffing hours */
  sun_am_from?: string;
  /** Stop staffing hours */
  sun_am_to?: string;
  /** Stop staffing hours */
  sun_pm_from?: string;
  /** Stop staffing hours */
  sun_pm_to?: string;
  /** Stop staffing hours */
  thu_am_from?: string;
  /** Stop staffing hours */
  thu_am_to?: string;
  /** Stop staffing hours */
  thu_pm_from?: string;
  /** Stop staffing hours */
  thu_pm_to?: string;
  /** Stop staffing hours */
  tue_am_from?: string;
  /** Stop staffing hours */
  tue_am_to?: string;
  /** Stop staffing hours */
  tue_pm_from?: string;
  /** Stop staffing hours */
  tue_pm_to?: string;
  /** Stop staffing hours */
  wed_am_from?: string;
  /** Stop staffing hours */
  wed_am_to?: string;
  /** Stop staffing hours */
  wed_pm_from?: string;
  /** Stop staffing hours */
  wed_pm_To?: string;
}

export interface V3StopGps {
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  longitude?: number;
}

export interface V3StopAccessibilityWheelchair {
  accessible_ramp?: boolean;
  /** Indicates if there is at least one accessible parking spot at the stop that complies with the Disability Standards for Accessible Public Transport under the Disability Discrimination Act (1992) */
  parking?: boolean;
  /** Indicates if there is at least one accessible telephone at the stop/platform that complies with the Disability Standards for Accessible Public Transport under the Disability Discrimination Act (1992) */
  telephone?: boolean;
  /** Indicates if there is at least one accessible toilet at the stop/platform that complies with the Disability Standards for Accessible Public Transport under the Disability Discrimination Act (1992) */
  toilet?: boolean;
  /** Indicates if there is at least one low ticket counter at the stop that complies with the Disability Standards for Accessible Public Transport under the Disability Discrimination Act (1992) */
  low_ticket_counter?: boolean;
  /** Indicates if there is a space for mobility device to board on or off a transport mode */
  manouvering?: boolean;
  /** Indicates if there is a raised platform to board a train */
  raised_platform?: boolean;
  /** Indicates if there are ramps (&lt;1:14) at the stop/platform */
  ramp?: boolean;
  /** Indicates if there is a path beyond the stop which is accessible */
  secondary_path?: boolean;
  /** Indicates if there is shelter near the raised platform */
  raised_platform_shelther?: boolean;
  /** Indicates if there are ramps (&gt;1:14) at the stop/platform */
  steep_ramp?: boolean;
}

export interface V3StopsOnRouteResponse {
  /** Train stations, tram stops, bus stops, regional coach stops or Night Bus stops */
  stops?: V3StopOnRoute[];
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: Record<string, V3Disruption>;
  /** GeoPath for the route */
  geopath?: object[];
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3StopOnRoute {
  /** Disruption information identifier(s) */
  disruption_ids?: number[];
  /** suburb of stop */
  stop_suburb?: string;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /**
   * Sequence of the stop on the route/run; return 0 when route_id or run_id not specified. Order ascendingly by this field (when non zero) to get physical order (earliest first) of stops on the route_id/run_id.
   * @format int32
   */
  stop_sequence?: number;
  /** Stop ticket information */
  stop_ticket?: V3StopTicket;
  /** Interchange information for connecting routes at this stop */
  interchange?: V3InterchangeRoute[];
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /** Name of stop */
  stop_name?: string;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
}

/** Information about route interchange */
export interface V3InterchangeRoute {
  /**
   * Route identifier
   * @format int32
   */
  route_id?: number;
  /** Indicates whether the interchange information is shown to end users */
  advertised?: boolean;
}

export interface V3StopsByDistanceResponse {
  /** Train stations, tram stops, bus stops, regional coach stops or Night Bus stops */
  stops?: V3StopGeosearch[];
  /** Disruption information applicable to relevant routes or stops */
  disruptions?: Record<string, V3Disruption>;
  /** API Status / Metadata */
  status?: V3Status;
}

export interface V3StopGeosearch {
  /** Disruption information identifier(s) */
  disruption_ids?: number[];
  /**
   * Distance of stop from input location (in metres); returns 0 if no location is input
   * @format float
   */
  stop_distance?: number;
  /** suburb of stop */
  stop_suburb?: string;
  /** Name of stop */
  stop_name?: string;
  /**
   * Stop identifier
   * @format int32
   */
  stop_id?: number;
  /**
   * Transport mode identifier
   * @format int32
   */
  route_type?: number;
  /** List of routes travelling through the stop */
  routes?: object[];
  /**
   * Geographic coordinate of latitude at stop
   * @format float
   */
  stop_latitude?: number;
  /**
   * Geographic coordinate of longitude at stop
   * @format float
   */
  stop_longitude?: number;
  /** Landmark in proximity of stop */
  stop_landmark?: string;
  /**
   * Sequence of the stop on the route/run; return 0 when route_id or run_id not specified. Order ascendingly by this field (when non zero) to get physical order (earliest first) of stops on the route_id/run_id.
   * @format int32
   */
  stop_sequence?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://timetableapi.ptv.vic.gov.au";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title PTV Timetable API - Version 3
 * @version v3
 * @license Creative Commons Attribution 4.0 International (https://creativecommons.org/licenses/by/4.0/)
 * @termsOfService http://ptv.vic.gov.au/ptv-timetable-api/
 * @baseUrl https://timetableapi.ptv.vic.gov.au
 * @contact Public Transport Victoria (http://ptv.vic.gov.au/digital)
 *
 * The PTV Timetable API provides direct access to Public Transport Victoria's public transport timetable data.
 *
 * The API returns scheduled timetable, route and stop data for all metropolitan and regional train, tram and bus services in Victoria, including Night Network(Night Train and Night Tram data are included in metropolitan train and tram services data, respectively, whereas Night Bus is a separate route type).
 *
 * The API also returns real-time data for metropolitan train, tram and bus services (where this data is made available to PTV), as well as disruption information, stop facility information, and access to myki ticket outlet data.
 *
 * This Swagger is for Version 3 of the PTV Timetable API. By using this documentation you agree to comply with the licence and terms of service.
 *
 * Train timetable data is updated daily, while the remaining data is updated weekly, taking into account any planned timetable changes (for example, due to holidays or planned disruptions). The PTV timetable API is the same API used by PTV for its apps. To access the most up to date data PTV has (including real-time data) you must use the API dynamically.
 *
 * You can access the PTV Timetable API through a HTTP or HTTPS interface, as follows:
 *
 *     base URL / version number / API name / query string
 * The base URL is either:
 *   *  http://timetableapi.ptv.vic.gov.au
 * or
 *   *  https://timetableapi.ptv.vic.gov.au
 *
 * The Swagger JSON file is available at http://timetableapi.ptv.vic.gov.au/swagger/docs/v3
 *
 * Frequently asked questions are available on the PTV website at http://ptv.vic.gov.au/apifaq
 *
 * Links to the following information are also provided on the PTV website at http://ptv.vic.gov.au/ptv-timetable-api/
 * * How to register for an API key and calculate a signature
 * * PTV Timetable API V2 to V3 Migration Guide
 * * PTV Timetable API Data Quality Statement
 *
 * All information about how to use the API is in this documentation. PTV cannot provide technical support for the API.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v3 = {
    /**
     * No description
     *
     * @tags Departures
     * @name DeparturesGetForStop
     * @summary View departures for all routes from a stop
     * @request GET:/v3/departures/route_type/{route_type}/stop/{stop_id}
     */
    departuresGetForStop: (
      routeType: 0 | 1 | 2 | 3 | 4,
      stopId: number,
      query?: {
        /** Filter by platform number at stop */
        platform_numbers?: number[];
        /**
         * Filter by identifier of direction of travel; values returned by Directions API - /v3/directions/route/{route_id}
         * @format int32
         */
        direction_id?: number;
        /** Indicates that stop_id parameter will accept "GTFS stop_id" data */
        gtfs?: boolean;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false)
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /**
         * Maximum number of results returned
         * @format int32
         */
        max_results?: number;
        /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
        include_cancelled?: boolean;
        /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
        look_backwards?: boolean;
        /**
         * List of objects to be returned in full (i.e. expanded) - options include: All, Stop, Route, Run, Direction, Disruption, VehiclePosition, VehicleDescriptor or None.
         * Run must be expanded to receive VehiclePosition and VehicleDescriptor information.
         */
        expand?: (
          | "All"
          | "Stop"
          | "Route"
          | "Run"
          | "Direction"
          | "Disruption"
          | "VehicleDescriptor"
          | "VehiclePosition"
          | "None"
        )[];
        /** Indicates if the route geopath should be returned */
        include_geopath?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DeparturesResponse, V3ErrorResponse>({
        path: `/v3/departures/route_type/${routeType}/stop/${stopId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Departures
     * @name DeparturesGetForStopAndRoute
     * @summary View departures for a specific route from a stop
     * @request GET:/v3/departures/route_type/{route_type}/stop/{stop_id}/route/{route_id}
     */
    departuresGetForStopAndRoute: (
      routeType: 0 | 1 | 2 | 3 | 4,
      stopId: number,
      routeId: string,
      query?: {
        /**
         * Filter by identifier of direction of travel; values returned by Directions API - /v3/directions/route/{route_id}
         * @format int32
         */
        direction_id?: number;
        /** Indicates that stop_id parameter will accept "GTFS stop_id" data */
        gtfs?: boolean;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false)
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /**
         * Maximum number of results returned
         * @format int32
         */
        max_results?: number;
        /** Indicates if cancelled services (if they exist) are returned (default = false) - metropolitan train only */
        include_cancelled?: boolean;
        /** Indicates if filtering runs (and their departures) to those that arrive at destination before date_utc (default = false). Requires max_results &gt; 0. */
        look_backwards?: boolean;
        /**
         * List of objects to be returned in full (i.e. expanded) - options include: All, Stop, Route, Run, Direction, Disruption, VehiclePosition, VehicleDescriptor or None.
         * Run must be expanded to receive VehiclePosition and VehicleDescriptor information.
         */
        expand?: (
          | "All"
          | "Stop"
          | "Route"
          | "Run"
          | "Direction"
          | "Disruption"
          | "VehicleDescriptor"
          | "VehiclePosition"
          | "None"
        )[];
        /** Indicates if the route geopath should be returned */
        include_geopath?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DeparturesResponse, V3ErrorResponse>({
        path: `/v3/departures/route_type/${routeType}/stop/${stopId}/route/${routeId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Directions
     * @name DirectionsForRoute
     * @summary View directions that a route travels in
     * @request GET:/v3/directions/route/{route_id}
     */
    directionsForRoute: (
      routeId: number,
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DirectionsResponse, V3ErrorResponse>({
        path: `/v3/directions/route/${routeId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Directions
     * @name DirectionsForDirection
     * @summary View all routes for a direction of travel
     * @request GET:/v3/directions/{direction_id}
     */
    directionsForDirection: (
      directionId: number,
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DirectionsResponse, V3ErrorResponse>({
        path: `/v3/directions/${directionId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Directions
     * @name DirectionsForDirectionAndType
     * @summary View all routes of a particular type for a direction of travel
     * @request GET:/v3/directions/{direction_id}/route_type/{route_type}
     */
    directionsForDirectionAndType: (
      directionId: number,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DirectionsResponse, V3ErrorResponse>({
        path: `/v3/directions/${directionId}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetAllDisruptions
     * @summary View all disruptions for all route types
     * @request GET:/v3/disruptions
     */
    disruptionsGetAllDisruptions: (
      query?: {
        /** Filter by route_type; values returned via RouteTypes API */
        route_types?: (0 | 1 | 2 | 3 | 4)[];
        /** Filter by disruption_mode; values returned via v3/disruptions/modes API */
        disruption_modes?: (1 | 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 100)[];
        /** Filter by status of disruption */
        disruption_status?: "current" | "planned";
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionsResponse, V3ErrorResponse>({
        path: `/v3/disruptions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetDisruptionsByRoute
     * @summary View all disruptions for a particular route
     * @request GET:/v3/disruptions/route/{route_id}
     */
    disruptionsGetDisruptionsByRoute: (
      routeId: number,
      query?: {
        /** Filter by status of disruption */
        disruption_status?: "current" | "planned";
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionsResponse, V3ErrorResponse>({
        path: `/v3/disruptions/route/${routeId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetDisruptionsByRouteAndStop
     * @summary View all disruptions for a particular route and stop
     * @request GET:/v3/disruptions/route/{route_id}/stop/{stop_id}
     */
    disruptionsGetDisruptionsByRouteAndStop: (
      routeId: number,
      stopId: number,
      query?: {
        /** Filter by status of disruption */
        disruption_status?: "current" | "planned";
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionsResponse, V3ErrorResponse>({
        path: `/v3/disruptions/route/${routeId}/stop/${stopId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetDisruptionsByStop
     * @summary View all disruptions for a particular stop
     * @request GET:/v3/disruptions/stop/{stop_id}
     */
    disruptionsGetDisruptionsByStop: (
      stopId: number,
      query?: {
        /** Filter by status of disruption */
        disruption_status?: "current" | "planned";
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionsResponse, V3ErrorResponse>({
        path: `/v3/disruptions/stop/${stopId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetDisruptionById
     * @summary View a specific disruption
     * @request GET:/v3/disruptions/{disruption_id}
     */
    disruptionsGetDisruptionById: (
      disruptionId: number,
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionResponse, V3ErrorResponse>({
        path: `/v3/disruptions/${disruptionId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disruptions
     * @name DisruptionsGetDisruptionModes
     * @summary Get all disruption modes
     * @request GET:/v3/disruptions/modes
     */
    disruptionsGetDisruptionModes: (
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3DisruptionModesResponse, V3ErrorResponse>({
        path: `/v3/disruptions/modes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags FareEstimate
     * @name FareEstimateGetFareEstimateByZone
     * @summary Estimate a fare by zone
     * @request GET:/v3/fare_estimate/min_zone/{minZone}/max_zone/{maxZone}
     */
    fareEstimateGetFareEstimateByZone: (
      minZone: number,
      maxZone: number,
      query?: {
        /**
         * JourneyTouchOnUtc in format yyyy-M-d h:m (e.g 2016-5-31 16:53).
         * @format date-time
         */
        journey_touch_on_utc?: string;
        /**
         * JourneyTouchOffUtc in format yyyy-M-d h:m (e.g 2016-5-31 16:53).
         * @format date-time
         */
        journey_touch_off_utc?: string;
        is_journey_in_free_tram_zone?: boolean;
        travelled_route_types?: (0 | 1 | 2 | 3 | 4)[];
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, V3ErrorResponse>({
        path: `/v3/fare_estimate/min_zone/${minZone}/max_zone/${maxZone}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outlets
     * @name OutletsGetAllOutlets
     * @summary List all ticket outlets
     * @request GET:/v3/outlets
     */
    outletsGetAllOutlets: (
      query?: {
        /**
         * Maximum number of results returned (default = 30)
         * @format int32
         */
        max_results?: number;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3OutletResponse, V3ErrorResponse>({
        path: `/v3/outlets`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Outlets
     * @name OutletsGetOutletsByGeolocation
     * @summary List ticket outlets near a specific location
     * @request GET:/v3/outlets/location/{latitude},{longitude}
     */
    outletsGetOutletsByGeolocation: (
      latitude: number,
      longitude: number,
      query?: {
        /**
         * Filter by maximum distance (in metres) from location specified via latitude and longitude parameters (default = 300)
         * @format double
         */
        max_distance?: number;
        /**
         * Maximum number of results returned (default = 30)
         * @format int32
         */
        max_results?: number;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3OutletGeolocationResponse, V3ErrorResponse>({
        path: `/v3/outlets/location/${latitude},${longitude}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Patterns
     * @name PatternsGetPatternByRun
     * @summary View the stopping pattern for a specific trip/service run
     * @request GET:/v3/pattern/run/{run_ref}/route_type/{route_type}
     */
    patternsGetPatternByRun: (
      runRef: string,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
        expand?: (
          | "All"
          | "Stop"
          | "Route"
          | "Run"
          | "Direction"
          | "Disruption"
          | "VehicleDescriptor"
          | "VehiclePosition"
          | "None"
        )[];
        /**
         * Filter by stop_id; values returned by Stops API
         * @format int32
         */
        stop_id?: number;
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /** Indicates if geopath data will be returned (default = false) */
        include_skipped_stops?: boolean;
        /** Indicates if geopath data will be returned (default = false) */
        include_geopath?: boolean;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false)
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3StoppingPattern, V3ErrorResponse>({
        path: `/v3/pattern/run/${runRef}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name RoutesOneOrMoreRoutes
     * @summary View route names and numbers for all routes
     * @request GET:/v3/routes
     */
    routesOneOrMoreRoutes: (
      query?: {
        /** Filter by route_type; values returned via RouteTypes API */
        route_types?: (0 | 1 | 2 | 3 | 4)[];
        /** Filter by name  of route (accepts partial route name matches) */
        route_name?: string;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RouteResponse, V3ErrorResponse>({
        path: `/v3/routes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name RoutesRouteFromId
     * @summary View route name and number for specific route ID
     * @request GET:/v3/routes/{route_id}
     */
    routesRouteFromId: (
      routeId: number,
      query?: {
        /** Indicates kif geopath data will be returned (default = false) */
        include_geopath?: boolean;
        /**
         * Filter geopaths by date (ISO 8601 UTC format) (default = current date)
         * @format date-time
         */
        geopath_utc?: string;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RouteResponse, V3ErrorResponse>({
        path: `/v3/routes/${routeId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags RouteTypes
     * @name RouteTypesGetRouteTypes
     * @summary View all route types and their names
     * @request GET:/v3/route_types
     */
    routeTypesGetRouteTypes: (
      query?: {
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RouteTypesResponse, V3ErrorResponse>({
        path: `/v3/route_types`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Runs
     * @name RunsForRoute
     * @summary View all trip/service runs for a specific route ID
     * @request GET:/v3/runs/route/{route_id}
     */
    runsForRoute: (
      routeId: number,
      query?: {
        /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
        expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false).
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RunsResponse, V3ErrorResponse>({
        path: `/v3/runs/route/${routeId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Runs
     * @name RunsForRouteAndRouteType
     * @summary View all trip/service runs for a specific route ID and route type
     * @request GET:/v3/runs/route/{route_id}/route_type/{route_type}
     */
    runsForRouteAndRouteType: (
      routeId: number,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
        expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false).
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RunsResponse, V3ErrorResponse>({
        path: `/v3/runs/route/${routeId}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Runs
     * @name RunsForRun
     * @summary View all trip/service runs for a specific run_ref
     * @request GET:/v3/runs/{run_ref}
     */
    runsForRun: (
      runRef: string,
      query?: {
        /** Indicates if geopath data will be returned (default = false) */
        include_geopath?: boolean;
        /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
        expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /**
         * Indicates whether data related to interchanges should be included in the response (default = false).
         * When set to true, this parameter enables API clients to retrieve exchange information in a single call instead of making multiple requests
         */
        include_advertised_interchange?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RunsResponse, V3ErrorResponse>({
        path: `/v3/runs/${runRef}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Runs
     * @name RunsForRunAndRouteType
     * @summary View the trip/service run for a specific run_ref and route type
     * @request GET:/v3/runs/{run_ref}/route_type/{route_type}
     */
    runsForRunAndRouteType: (
      runRef: string,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /** List of objects to be returned in full (i.e. expanded) - options include: All, VehiclePosition, VehicleDescriptor, or None. Default is None. */
        expand?: ("All" | "VehicleDescriptor" | "VehiclePosition" | "None")[];
        /**
         * Filter by the date and time of the request (ISO 8601 UTC format) (default = current date and time)
         * @format date-time
         */
        date_utc?: string;
        /** Indicates if geopath data will be returned (default = false) */
        include_geopath?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3RunResponse, V3ErrorResponse>({
        path: `/v3/runs/${runRef}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name SearchSearch
     * @summary View stops, routes and myki ticket outlets that match the search term
     * @request GET:/v3/search/{search_term}
     */
    searchSearch: (
      searchTerm: string,
      query?: {
        /** Filter by route_type; values returned via RouteTypes API (note: stops and routes are ordered by route_types specified) */
        route_types?: (0 | 1 | 2 | 3 | 4)[];
        /**
         * Filter by geographic coordinate of latitude
         * @format float
         */
        latitude?: number;
        /**
         * Filter by geographic coordinate of longitude
         * @format float
         */
        longitude?: number;
        /**
         * Filter by maximum distance (in metres) from location specified via latitude and longitude parameters
         * @format float
         */
        max_distance?: number;
        /** Placeholder for future development; currently unavailable */
        include_addresses?: boolean;
        /** Indicates if outlets will be returned in response (default = true) */
        include_outlets?: boolean;
        /** Indicates whether to find stops by suburbs in the search term (default = true) */
        match_stop_by_suburb?: boolean;
        /** Indicates whether to find routes by suburbs in the search term (default = true) */
        match_route_by_suburb?: boolean;
        /** Indicates whether to search for stops according to a metlink stop ID (default = false) */
        match_stop_by_gtfs_stop_id?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3SearchResult, V3ErrorResponse>({
        path: `/v3/search/${searchTerm}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stops
     * @name StopsStopDetails
     * @summary View facilities at a specific stop (Metro and V/Line stations only)
     * @request GET:/v3/stops/{stop_id}/route_type/{route_type}
     */
    stopsStopDetails: (
      stopId: number,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /** Indicates if stop location information will be returned (default = false) */
        stop_location?: boolean;
        /** Indicates if stop amenity information will be returned (default = false) */
        stop_amenities?: boolean;
        /** Indicates if stop accessibility information will be returned (default = false) */
        stop_accessibility?: boolean;
        /** Indicates if stop contact information will be returned (default = false) */
        stop_contact?: boolean;
        /** Indicates if stop ticket information will be returned (default = false) */
        stop_ticket?: boolean;
        /** Incdicates whether the stop_id is a GTFS ID or not */
        gtfs?: boolean;
        /** Indicates if stop staffing information will be returned (default = false) */
        stop_staffing?: boolean;
        /** Indicates if stop disruption information will be returned (default = false) */
        stop_disruptions?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3StopResponse, V3ErrorResponse>({
        path: `/v3/stops/${stopId}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stops
     * @name StopsStopsForRoute
     * @summary View all stops on a specific route
     * @request GET:/v3/stops/route/{route_id}/route_type/{route_type}
     */
    stopsStopsForRoute: (
      routeId: number,
      routeType: 0 | 1 | 2 | 3 | 4,
      query?: {
        /**
         * An optional direction; values returned by Directions API. When this is set, stop sequence information is returned in the response.
         * @format int32
         */
        direction_id?: number;
        /** Indicates if stop disruption information will be returned (default = false) */
        stop_disruptions?: boolean;
        /** Indicates if geopath data will be returned (default = false) */
        include_geopath?: boolean;
        /**
         * Filter geopaths by date (ISO 8601 UTC format) (default = current date)
         * @format date-time
         */
        geopath_utc?: string;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3StopsOnRouteResponse, V3ErrorResponse>({
        path: `/v3/stops/route/${routeId}/route_type/${routeType}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Stops
     * @name StopsStopsByGeolocation
     * @summary View all stops near a specific location
     * @request GET:/v3/stops/location/{latitude},{longitude}
     */
    stopsStopsByGeolocation: (
      latitude: number,
      longitude: number,
      query?: {
        /** Filter by route_type; values returned via RouteTypes API */
        route_types?: (0 | 1 | 2 | 3 | 4)[];
        /**
         * Maximum number of results returned (default = 30)
         * @format int32
         */
        max_results?: number;
        /**
         * Filter by maximum distance (in metres) from location specified via latitude and longitude parameters (default = 300)
         * @format double
         */
        max_distance?: number;
        /** Indicates if stop disruption information will be returned (default = false) */
        stop_disruptions?: boolean;
        /** Please ignore */
        token?: string;
        /** Your developer id */
        devid?: string;
        /** Authentication signature for request */
        signature?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<V3StopsByDistanceResponse, V3ErrorResponse>({
        path: `/v3/stops/location/${latitude},${longitude}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
