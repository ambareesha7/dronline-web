/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  proto: {
    nested: {
      channels: {
        options: {
          "(elixir_module_prefix)": "Proto.Channels"
        },
        nested: {
          GetTokenResponse: {
            fields: {
              token: {
                type: "string",
                id: 1
              }
            }
          },
          SocketMessage: {
            fields: {
              topic: {
                type: "string",
                id: 1
              },
              event: {
                type: "string",
                id: 2
              },
              payload: {
                type: "ChannelPayload",
                id: 3
              },
              ref: {
                type: "string",
                id: 4
              },
              joinRef: {
                type: "string",
                id: 5
              },
              replyStatus: {
                type: "string",
                id: 6
              }
            },
            nested: {
              ChannelPayload: {
                oneofs: {
                  message: {
                    oneof: [
                      "joinedChannel",
                      "phxReply",
                      "joinQueue",
                      "leaveQueue",
                      "callGp",
                      "cancelCallToGp",
                      "answerCallFromNurse",
                      "startCall",
                      "inviteDoctorCategory",
                      "inviteDoctor",
                      "cancelDoctorCategoryInvitation",
                      "cancelCallToDoctor",
                      "acceptDoctorCategoryInvitation",
                      "answerCallToDoctor",
                      "endCallForAll",
                      "patientLocationCoordinates",
                      "patientsQueueUpdate",
                      "pendingNurseToGpCallsUpdate",
                      "doctorCategoryInvitationsUpdate",
                      "queueToDoctorUpdate",
                      "callEstablished",
                      "newTimelineItem",
                      "newTimelineItemComment",
                      "activePackageUpdate",
                      "callEnded",
                      "pendingDispatchesUpdate",
                      "presenceState",
                      "presenceDiff",
                      "pendingVisitsUpdate",
                      "doctorPendingVisitsUpdate",
                      "newNotification",
                      "ping",
                      "pong"
                    ]
                  }
                },
                fields: {
                  joinedChannel: {
                    type: "JoinedChannel",
                    id: 1
                  },
                  phxReply: {
                    type: "string",
                    id: 2
                  },
                  joinQueue: {
                    type: "calls.JoinQueue",
                    id: 3
                  },
                  leaveQueue: {
                    type: "calls.LeaveQueue",
                    id: 4
                  },
                  callGp: {
                    type: "calls.CallGP",
                    id: 27
                  },
                  cancelCallToGp: {
                    type: "calls.CancelCallToGP",
                    id: 28
                  },
                  answerCallFromNurse: {
                    type: "calls.AnswerCallFromNurse",
                    id: 30
                  },
                  startCall: {
                    type: "calls.StartCall",
                    id: 7
                  },
                  inviteDoctorCategory: {
                    type: "calls.InviteDoctorCategory",
                    id: 35
                  },
                  inviteDoctor: {
                    type: "calls.InviteDoctor",
                    id: 21
                  },
                  cancelDoctorCategoryInvitation: {
                    type: "calls.CancelDoctorCategoryInvitation",
                    id: 36
                  },
                  cancelCallToDoctor: {
                    type: "calls.CancelCallToDoctor",
                    id: 20
                  },
                  acceptDoctorCategoryInvitation: {
                    type: "calls.AcceptDoctorCategoryInvitation",
                    id: 37
                  },
                  answerCallToDoctor: {
                    type: "calls.AnswerCallToDoctor",
                    id: 18
                  },
                  endCallForAll: {
                    type: "calls.EndCallForAll",
                    id: 23
                  },
                  patientLocationCoordinates: {
                    type: "generics.Coordinates",
                    id: 25
                  },
                  patientsQueueUpdate: {
                    type: "calls.PatientsQueue",
                    id: 5
                  },
                  pendingNurseToGpCallsUpdate: {
                    type: "calls.PendingNurseToGPCalls",
                    id: 29
                  },
                  doctorCategoryInvitationsUpdate: {
                    type: "calls.DoctorCategoryInvitations",
                    id: 38
                  },
                  queueToDoctorUpdate: {
                    type: "calls.QueueToDoctor",
                    id: 17
                  },
                  callEstablished: {
                    type: "calls.CallEstablished",
                    id: 8
                  },
                  newTimelineItem: {
                    type: "timeline.NewTimelineItem",
                    id: 16
                  },
                  newTimelineItemComment: {
                    type: "emr.NewTimelineItemComment",
                    id: 39
                  },
                  activePackageUpdate: {
                    type: "membership.ActivePackageUpdate",
                    id: 22
                  },
                  callEnded: {
                    type: "calls.CallEnded",
                    id: 24
                  },
                  pendingDispatchesUpdate: {
                    type: "dispatches.PendingDispatchesUpdate",
                    id: 26
                  },
                  presenceState: {
                    type: "presence.PresenceState",
                    id: 31
                  },
                  presenceDiff: {
                    type: "presence.PresenceDiff",
                    id: 32
                  },
                  pendingVisitsUpdate: {
                    type: "visits.PendingVisitsUpdate",
                    id: 33
                  },
                  doctorPendingVisitsUpdate: {
                    type: "visits.DoctorPendingVisitsUpdate",
                    id: 34
                  },
                  newNotification: {
                    type: "notifications.NewNotification",
                    id: 40
                  },
                  ping: {
                    type: "string",
                    id: 101
                  },
                  pong: {
                    type: "string",
                    id: 102
                  }
                },
                nested: {
                  JoinedChannel: {
                    fields: {}
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  calls: {
    options: {
      "(elixir_module_prefix)": "Proto.Calls"
    },
    nested: {
      LocalClinicResponse: {
        oneofs: {
          clinic: {
            oneof: [
              "localClinic"
            ]
          }
        },
        fields: {
          localClinic: {
            type: "Clinic",
            id: 1
          }
        }
      },
      Clinic: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          logoUrl: {
            type: "string",
            id: 2
          }
        }
      },
      GetPatientsQueueResponse: {
        fields: {
          patientsQueue: {
            type: "PatientsQueue",
            id: 1
          }
        }
      },
      GetPendingNurseToGPCallsResponse: {
        fields: {
          pendingCalls: {
            type: "PendingNurseToGPCalls",
            id: 1
          }
        }
      },
      GetQueueToDoctorResponse: {
        fields: {
          queueToDoctor: {
            type: "QueueToDoctor",
            id: 1
          }
        }
      },
      GetDoctorCategoryInvitationsResponse: {
        fields: {
          doctorCategoryInvitations: {
            type: "DoctorCategoryInvitations",
            id: 1
          }
        }
      },
      GetHPIResponse: {
        fields: {
          hpi: {
            type: "emr.HPI",
            id: 1
          }
        }
      },
      UpdateHPIRequest: {
        fields: {
          hpi: {
            type: "forms.Form",
            id: 1
          }
        }
      },
      UpdateHPIResponse: {
        fields: {
          hpi: {
            type: "emr.HPI",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          }
        }
      },
      GetPatientLocationCoordinatesResponse: {
        fields: {
          patientLocationCoordinates: {
            type: "generics.Coordinates",
            id: 1
          }
        }
      },
      JoinQueue: {
        fields: {
          recordId: {
            type: "uint64",
            id: 1
          },
          patientLocation: {
            type: "generics.Coordinates",
            id: 2
          },
          paymentParams: {
            type: "visits.PaymentsParams",
            id: 3
          }
        }
      },
      LeaveQueue: {
        fields: {}
      },
      CallGP: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          }
        }
      },
      CancelCallToGP: {
        fields: {}
      },
      AnswerCallFromNurse: {
        fields: {
          nurseId: {
            type: "uint64",
            id: 1
          }
        }
      },
      StartCall: {
        fields: {
          callerId: {
            type: "uint64",
            id: 2
          }
        }
      },
      InviteDoctor: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          },
          currentSessionId: {
            type: "string",
            id: 4
          }
        }
      },
      CancelCallToDoctor: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          }
        }
      },
      AnswerCallToDoctor: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          caller: {
            type: "Caller",
            id: 2
          },
          callerId: {
            type: "uint64",
            id: 3
          },
          sessionId: {
            type: "string",
            id: 4
          },
          callId: {
            type: "string",
            id: 5
          }
        },
        nested: {
          Caller: {
            values: {
              UNKNOWN: 0,
              GP: 1,
              NURSE: 2
            }
          }
        }
      },
      InviteDoctorCategory: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          },
          currentSessionId: {
            type: "string",
            id: 4
          }
        }
      },
      CancelDoctorCategoryInvitation: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          callId: {
            type: "string",
            id: 2
          }
        }
      },
      AcceptDoctorCategoryInvitation: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          callId: {
            type: "string",
            id: 2
          }
        }
      },
      PatientsQueue: {
        fields: {
          patientsQueueEntries: {
            rule: "repeated",
            type: "PatientsQueueEntry",
            id: 1
          }
        }
      },
      PatientsQueueEntry: {
        fields: {
          patient: {
            type: "generics.Patient",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          }
        }
      },
      PendingNurseToGPCalls: {
        fields: {
          pendingCalls: {
            rule: "repeated",
            type: "PendingNurseToGPCall",
            id: 1
          }
        }
      },
      PendingNurseToGPCall: {
        fields: {
          nurse: {
            type: "generics.Specialist",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          }
        }
      },
      QueueToDoctor: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          queue: {
            rule: "repeated",
            type: "Caller",
            id: 2
          }
        },
        nested: {
          Caller: {
            fields: {
              callerId: {
                type: "uint64",
                id: 1
              },
              type: {
                type: "Type",
                id: 2
              },
              firstName: {
                type: "string",
                id: 3
              },
              lastName: {
                type: "string",
                id: 4
              },
              joinTimestamp: {
                type: "uint64",
                id: 5
              },
              sessionId: {
                type: "string",
                id: 6
              },
              callId: {
                type: "string",
                id: 7
              },
              patientId: {
                type: "uint64",
                id: 8
              },
              recordId: {
                type: "uint64",
                id: 9
              }
            },
            nested: {
              Type: {
                values: {
                  UNKNOWN: 0,
                  GP: 1,
                  NURSE: 2
                }
              }
            }
          }
        }
      },
      DoctorCategoryInvitations: {
        fields: {
          categoryId: {
            type: "uint64",
            id: 1
          },
          invitations: {
            rule: "repeated",
            type: "DoctorCategoryInvitation",
            id: 2
          }
        }
      },
      DoctorCategoryInvitation: {
        fields: {
          invitedBy: {
            type: "generics.Specialist",
            id: 1
          },
          callId: {
            type: "string",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          },
          recordId: {
            type: "uint64",
            id: 4
          },
          sentAt: {
            type: "uint64",
            id: 5
          }
        }
      },
      CallEstablished: {
        fields: {
          token: {
            type: "string",
            id: 1
          },
          sessionId: {
            type: "string",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          },
          recordId: {
            type: "uint64",
            id: 4
          },
          apiKey: {
            type: "string",
            id: 5
          },
          callId: {
            type: "string",
            id: 6
          }
        }
      },
      EndCallForAll: {
        fields: {}
      },
      CallEnded: {
        fields: {}
      },
      NursePatientCallRequest: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          }
        }
      },
      NursePatientCallResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          sessionId: {
            type: "string",
            id: 2
          },
          nurseSessionToken: {
            type: "string",
            id: 3
          },
          callId: {
            type: "string",
            id: 4
          },
          apiKey: {
            type: "string",
            id: 5
          }
        }
      },
      SpecialistPatientCallRequest: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          }
        }
      },
      SpecialistPatientCallResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          sessionId: {
            type: "string",
            id: 2
          },
          specialistSessionToken: {
            type: "string",
            id: 3
          },
          callId: {
            type: "string",
            id: 4
          },
          apiKey: {
            type: "string",
            id: 5
          },
          recordId: {
            type: "uint64",
            id: 6
          }
        }
      },
      VisitCallRequest: {
        fields: {
          visitId: {
            type: "uint64",
            id: 1
          }
        }
      },
      VisitCallResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 6
          },
          sessionId: {
            type: "string",
            id: 2
          },
          doctorSessionToken: {
            type: "string",
            id: 3
          },
          callId: {
            type: "string",
            id: 4
          },
          apiKey: {
            type: "string",
            id: 5
          }
        }
      },
      PendingVisitCallRequest: {
        fields: {
          visitId: {
            type: "string",
            id: 1
          }
        }
      },
      PendingVisitCallResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          },
          sessionId: {
            type: "string",
            id: 3
          },
          gpSessionToken: {
            type: "string",
            id: 4
          },
          callId: {
            type: "string",
            id: 5
          },
          apiKey: {
            type: "string",
            id: 6
          }
        }
      },
      DoctorPendingVisitCallRequest: {
        fields: {
          visitId: {
            type: "string",
            id: 1
          }
        }
      },
      DoctorPendingVisitCallResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          },
          sessionId: {
            type: "string",
            id: 3
          },
          doctorSessionToken: {
            type: "string",
            id: 4
          },
          callId: {
            type: "string",
            id: 5
          },
          apiKey: {
            type: "string",
            id: 6
          }
        }
      },
      CreateFamilyMemberInvitationRequest: {
        fields: {
          sessionId: {
            type: "string",
            id: 1
          },
          callId: {
            type: "string",
            id: 2
          },
          phoneNumber: {
            type: "string",
            id: 3
          },
          name: {
            type: "string",
            id: 4
          }
        }
      },
      GetFamilyMemberInvitationResponse: {
        fields: {
          invitation: {
            type: "FamilyMemberInvitation",
            id: 1
          },
          apiKey: {
            type: "string",
            id: 2
          },
          patient: {
            type: "generics.Patient",
            id: 3
          }
        }
      },
      FamilyMemberInvitation: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          sessionId: {
            type: "string",
            id: 3
          },
          callId: {
            type: "string",
            id: 4
          },
          phoneNumber: {
            type: "string",
            id: 5
          },
          sessionToken: {
            type: "string",
            id: 6
          },
          name: {
            type: "string",
            id: 7
          }
        }
      }
    }
  },
  dispatches: {
    options: {
      "(elixir_module_prefix)": "Proto.Dispatches"
    },
    nested: {
      RequestDispatchToPatientRequest: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          },
          patientLocation: {
            type: "PatientLocation",
            id: 3
          }
        }
      },
      RequestDispatchToPatientResponse: {
        fields: {}
      },
      GetPendingDispatchesResponse: {
        fields: {
          dispatches: {
            rule: "repeated",
            type: "Dispatch",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          }
        }
      },
      TakePendingDispatchRequest: {
        fields: {}
      },
      TakePendingDispatchResponse: {
        fields: {
          dispatch: {
            type: "Dispatch",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          },
          patient: {
            type: "generics.Patient",
            id: 3
          }
        }
      },
      GetOngoingDispatchResponse: {
        fields: {
          dispatch: {
            type: "Dispatch",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          },
          patient: {
            type: "generics.Patient",
            id: 3
          }
        }
      },
      EndDispatchRequest: {
        fields: {}
      },
      EndDispatchResponse: {
        fields: {}
      },
      GetCurrentDispatchesResponse: {
        fields: {
          detailedDispatches: {
            rule: "repeated",
            type: "DetailedDispatch",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetEndedDispatchesResponse: {
        fields: {
          detailedDispatches: {
            rule: "repeated",
            type: "DetailedDispatch",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          },
          totalCount: {
            type: "uint32",
            id: 3
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 4
          }
        }
      },
      GetDispatchDetailsResponse: {
        fields: {
          detailedDispatch: {
            type: "DetailedDispatch",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          },
          patient: {
            type: "generics.Patient",
            id: 3
          }
        }
      },
      PendingDispatchesUpdate: {
        fields: {
          dispatches: {
            rule: "repeated",
            type: "Dispatch",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          }
        }
      },
      Dispatch: {
        fields: {
          requestId: {
            type: "string",
            id: 1
          },
          requestedAt: {
            type: "uint64",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          },
          requesterId: {
            type: "uint64",
            id: 4
          },
          recordId: {
            type: "uint64",
            id: 5
          },
          patientLocation: {
            type: "PatientLocation",
            id: 6
          }
        }
      },
      DetailedDispatch: {
        fields: {
          dispatch: {
            type: "Dispatch",
            id: 1
          },
          status: {
            type: "Status",
            id: 2
          },
          takenAt: {
            type: "generics.DateTime",
            id: 3
          },
          endedAt: {
            type: "generics.DateTime",
            id: 4
          },
          nurseId: {
            type: "uint64",
            id: 5
          }
        },
        nested: {
          Status: {
            values: {
              UNKNOWN: 0,
              OPEN: 1,
              ONGOING: 2,
              ENDED: 3
            }
          }
        }
      },
      PatientLocation: {
        fields: {
          address: {
            type: "Address",
            id: 1
          }
        },
        nested: {
          Address: {
            fields: {
              country: {
                type: "string",
                id: 1
              },
              city: {
                type: "string",
                id: 2
              },
              postalCode: {
                type: "string",
                id: 3
              },
              streetName: {
                type: "string",
                id: 4
              },
              buildingNumber: {
                type: "string",
                id: 5
              },
              district: {
                type: "string",
                id: 6
              },
              additionalNumbers: {
                type: "string",
                id: 7
              }
            }
          }
        }
      }
    }
  },
  generics: {
    options: {
      "(elixir_module_prefix)": "Proto.Generics"
    },
    nested: {
      DateTime: {
        fields: {
          timestamp: {
            type: "int64",
            id: 1
          }
        }
      },
      Height: {
        fields: {
          value: {
            type: "int32",
            id: 1
          },
          unit: {
            type: "Unit",
            id: 2
          }
        },
        nested: {
          Unit: {
            values: {
              CM: 0
            }
          }
        }
      },
      Weight: {
        fields: {
          value: {
            type: "int32",
            id: 1
          },
          unit: {
            type: "Unit",
            id: 2
          }
        },
        nested: {
          Unit: {
            values: {
              KG: 0
            }
          }
        }
      },
      MedicalTitle: {
        values: {
          UNKNOWN_MEDICAL_TITLE: 0,
          M_D: 1,
          D_O: 2,
          PH_D: 3,
          D_D_S: 4,
          N_P: 5,
          P_A: 6,
          R_N: 7,
          R_D: 8,
          R_D_N: 9,
          D_P_M: 10,
          M_B_B_S: 11
        }
      },
      Gender: {
        values: {
          UNKNOWN_GENDER: 0,
          MALE: 1,
          FEMALE: 2,
          OTHER: 3
        }
      },
      Title: {
        values: {
          UNKNOWN_TITLE: 0,
          MR: 1,
          MRS: 2,
          MS: 3
        }
      },
      Specialist: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          title: {
            type: "Title",
            id: 8
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          avatarUrl: {
            type: "string",
            id: 4
          },
          type: {
            type: "Type",
            id: 5
          },
          "package": {
            type: "Package",
            id: 6
          },
          deprecated: {
            rule: "repeated",
            type: "string",
            id: 7
          },
          medicalCategories: {
            rule: "repeated",
            type: "MedicalCategory",
            id: 9
          },
          gender: {
            type: "generics.Gender",
            id: 10
          },
          medicalTitle: {
            type: "generics.MedicalTitle",
            id: 11
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN: 0,
              GP: 1,
              NURSE: 2,
              EXTERNAL: 3
            }
          },
          Package: {
            values: {
              UNKOWN: 0,
              BASIC: 1,
              SILVER: 2,
              GOLD: 3,
              PLATINUM: 4
            }
          },
          MedicalCategory: {
            fields: {
              id: {
                type: "uint64",
                id: 1
              },
              name: {
                type: "string",
                id: 2
              }
            }
          }
        }
      },
      Patient: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          title: {
            type: "Title",
            id: 4
          },
          birthDate: {
            type: "generics.DateTime",
            id: 5
          },
          avatarUrl: {
            type: "string",
            id: 6
          },
          relatedAdult: {
            type: "RelatedAdult",
            id: 7
          },
          gender: {
            type: "generics.Gender",
            id: 8
          },
          isInsured: {
            type: "bool",
            id: 9
          },
          insuranceProviderName: {
            type: "string",
            id: 10
          },
          insuranceMemberId: {
            type: "string",
            id: 11
          }
        },
        nested: {
          RelatedAdult: {
            fields: {
              id: {
                type: "uint64",
                id: 1
              }
            }
          }
        }
      },
      Coordinates: {
        fields: {
          lat: {
            type: "float",
            id: 1
          },
          lon: {
            type: "float",
            id: 2
          }
        }
      },
      Countries: {
        fields: {
          countries: {
            rule: "repeated",
            type: "Country",
            id: 1
          }
        }
      },
      Country: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          dialCode: {
            type: "string",
            id: 3
          }
        }
      }
    }
  },
  emr: {
    options: {
      "(elixir_module_prefix)": "Proto.EMR"
    },
    nested: {
      GetPatientsResponse: {
        fields: {
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        }
      },
      GetPatientRecordsResponse: {
        fields: {
          patientRecords: {
            rule: "repeated",
            type: "PatientRecord",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 3
          }
        }
      },
      GetPatientRecordResponse: {
        fields: {
          patientRecord: {
            type: "PatientRecord",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      CreateMedicalRecordRequest: {
        fields: {}
      },
      CreateMedicalRecordResponse: {
        fields: {
          patientRecord: {
            type: "PatientRecord",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      InvitePatientRequest: {
        fields: {
          invitation: {
            type: "Invitation",
            id: 1
          }
        }
      },
      CreatePatientRequest: {
        fields: {
          firebaseToken: {
            type: "string",
            id: 1
          }
        }
      },
      CreatePatientResponse: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          }
        }
      },
      AddMedicalSummaryRequest: {
        fields: {
          medicalSummaryData: {
            type: "MedicalSummaryData",
            id: 1
          },
          requestUuid: {
            type: "string",
            id: 2
          },
          conditions: {
            rule: "repeated",
            type: "string",
            id: 3
          },
          procedures: {
            rule: "repeated",
            type: "string",
            id: 4
          },
          skipPatientNotification: {
            type: "bool",
            id: 5
          }
        }
      },
      AddMedicalSummaryDraftRequest: {
        fields: {
          medicalSummaryData: {
            type: "MedicalSummaryData",
            id: 1
          },
          conditions: {
            rule: "repeated",
            type: "string",
            id: 2
          },
          procedures: {
            rule: "repeated",
            type: "string",
            id: 3
          }
        }
      },
      GetMedicalSummariesResponse: {
        fields: {
          medicalSummaries: {
            rule: "repeated",
            type: "MedicalSummary",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetMedicalSummaryResponse: {
        fields: {
          medicalSummary: {
            type: "MedicalSummary",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetRecordSpecialistsResponse: {
        fields: {
          deprecated: {
            rule: "repeated",
            type: "Specialist",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetHPIResponse: {
        fields: {
          hpi: {
            type: "HPI",
            id: 1
          }
        }
      },
      GetHPIHistoryResponse: {
        fields: {
          hpis: {
            rule: "repeated",
            type: "HPI",
            id: 1
          }
        }
      },
      UpdateHPIRequest: {
        fields: {
          hpi: {
            type: "forms.Form",
            id: 1
          }
        }
      },
      UpdateHPIResponse: {
        fields: {
          hpi: {
            type: "HPI",
            id: 1
          }
        }
      },
      GetRecordVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "visits.VisitDataForPatient",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        }
      },
      GetRecordBMIEntriesResponse: {
        fields: {
          bmiEntries: {
            rule: "repeated",
            type: "BMIEntry",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        },
        nested: {
          BMIEntry: {
            fields: {
              bmi: {
                type: "patient_profile.BMI",
                id: 1
              },
              insertedAt: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      },
      GetRecordBloodPressureEntriesResponse: {
        fields: {
          bloodPressureEntries: {
            rule: "repeated",
            type: "BloodPressureEntry",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        },
        nested: {
          BloodPressureEntry: {
            fields: {
              bloodPressure: {
                type: "patient_profile.BloodPressure",
                id: 1
              },
              insertedAt: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      },
      GetRecordCallRecordingsResponse: {
        fields: {
          callRecordings: {
            rule: "repeated",
            type: "CallRecording",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        },
        nested: {
          CallRecording: {
            fields: {
              videoUrl: {
                type: "string",
                id: 1
              },
              thumbnailUrl: {
                type: "string",
                id: 2
              },
              sessionId: {
                type: "string",
                id: 3
              },
              insertedAt: {
                type: "uint64",
                id: 4
              }
            }
          }
        }
      },
      GetPendingMedicalSummaryResponse: {
        fields: {
          pendingMedicalSummary: {
            type: "PendingMedicalSummary",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          medicalSummaryDraft: {
            type: "MedicalSummaryDraft",
            id: 3
          }
        },
        nested: {
          PendingMedicalSummary: {
            fields: {
              recordId: {
                type: "uint64",
                id: 1
              },
              patientId: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      },
      SpecialistEncountersResponse: {
        fields: {
          encounters: {
            rule: "repeated",
            type: "SpecialistEncounter",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          },
          nextToken: {
            type: "string",
            id: 3
          }
        }
      },
      SpecialistEncounterResponse: {
        fields: {
          encounter: {
            type: "SpecialistEncounter",
            id: 1
          },
          patient: {
            type: "generics.Patient",
            id: 2
          }
        }
      },
      SpecialistEncountersStatsResponse: {
        fields: {
          scheduled: {
            type: "uint64",
            id: 1
          },
          pending: {
            type: "uint64",
            id: 2
          },
          completed: {
            type: "uint64",
            id: 3
          },
          canceled: {
            type: "uint64",
            id: 4
          }
        }
      },
      CreateTimelineItemCommentRequest: {
        fields: {
          body: {
            type: "string",
            id: 1
          }
        }
      },
      CreateTimelineItemCommentResponse: {
        fields: {
          timelineItemComment: {
            type: "TimelineItemComment",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          },
          updatedCommentsCounter: {
            type: "uint32",
            id: 3
          }
        }
      },
      NewTimelineItemComment: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          },
          timelineItemId: {
            type: "string",
            id: 3
          },
          timelineItemComment: {
            type: "TimelineItemComment",
            id: 4
          },
          specialist: {
            type: "generics.Specialist",
            id: 5
          },
          updatedCommentsCounter: {
            type: "uint32",
            id: 6
          }
        }
      },
      GetTimelineItemCommentsResponse: {
        fields: {
          timelineItemComments: {
            rule: "repeated",
            type: "TimelineItemComment",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          nextToken: {
            type: "string",
            id: 3
          },
          totalCommentsCounter: {
            type: "uint32",
            id: 4
          }
        }
      },
      CreateNewVitalsRequest: {
        fields: {
          vitalsParams: {
            type: "VitalsParams",
            id: 1
          }
        }
      },
      CreateNewVitalsResponse: {
        fields: {
          vitals: {
            type: "Vitals",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      CreateOrderedTestsRequest: {
        fields: {
          items: {
            rule: "repeated",
            type: "OrderedTestsParamsItem",
            id: 1
          }
        }
      },
      CreateOrderedTestsResponse: {
        fields: {
          items: {
            rule: "repeated",
            type: "OrderedTestsItem",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      AssignMedicationsRequest: {
        fields: {
          items: {
            rule: "repeated",
            type: "MedicationsItem",
            id: 1
          }
        }
      },
      GetOrderedTestsHistoryResponse: {
        fields: {
          bundles: {
            rule: "repeated",
            type: "TestsBundle",
            id: 1
          }
        }
      },
      GetMedicationsHistoryResponse: {
        fields: {
          bundles: {
            rule: "repeated",
            type: "MedicationsBundle",
            id: 1
          }
        }
      },
      GetVitalsResponse: {
        fields: {
          vitals: {
            type: "Vitals",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetVitalsHistoryResponse: {
        fields: {
          vitalsHistory: {
            rule: "repeated",
            type: "Vitals",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          nextToken: {
            type: "string",
            id: 3
          }
        }
      },
      GetMedicalConditionsRequest: {
        fields: {
          filter: {
            type: "string",
            id: 1
          }
        }
      },
      GetMedicalConditionsResponse: {
        fields: {
          conditions: {
            rule: "repeated",
            type: "MedicalCondition",
            id: 1
          }
        }
      },
      GetMedicalProceduresRequest: {
        fields: {
          filter: {
            type: "string",
            id: 1
          }
        }
      },
      GetMedicalProceduresResponse: {
        fields: {
          procedures: {
            rule: "repeated",
            type: "MedicalProcedure",
            id: 1
          }
        }
      },
      GetMedicalMedicationsRequest: {
        fields: {
          filter: {
            type: "string",
            id: 1
          }
        }
      },
      GetMedicalMedicationsResponse: {
        fields: {
          medications: {
            rule: "repeated",
            type: "MedicalMedication",
            id: 1
          }
        }
      },
      GetMedicalTestsByCategoriesResponse: {
        fields: {
          categories: {
            rule: "repeated",
            type: "MedicalTestsCategory",
            id: 1
          }
        }
      },
      TimelineItemComment: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          commentedBySpecialistId: {
            type: "uint64",
            id: 2
          },
          body: {
            type: "string",
            id: 3
          },
          insertedAt: {
            type: "uint64",
            id: 4
          }
        }
      },
      MedicalSummary: {
        fields: {
          medicalSummaryData: {
            type: "MedicalSummaryData",
            id: 1
          },
          specialistId: {
            type: "uint64",
            id: 4
          },
          insertedAt: {
            type: "uint64",
            id: 3
          },
          conditions: {
            rule: "repeated",
            type: "MedicalCondition",
            id: 5
          },
          procedures: {
            rule: "repeated",
            type: "MedicalProcedure",
            id: 6
          },
          isDraft: {
            type: "bool",
            id: 7
          },
          editedAt: {
            type: "generics.DateTime",
            id: 8
          }
        }
      },
      ShowMedicalSummaryDraftResponse: {
        fields: {
          medicalSummaryDraft: {
            type: "MedicalSummaryDraft",
            id: 1
          }
        }
      },
      GetLatestMedicalSummaryResponse: {
        fields: {
          medicalSummary: {
            type: "MedicalSummary",
            id: 1
          }
        }
      },
      MedicalSummaryDraft: {
        fields: {
          medicalSummaryData: {
            type: "MedicalSummaryData",
            id: 2
          },
          conditions: {
            rule: "repeated",
            type: "MedicalCondition",
            id: 3
          },
          procedures: {
            rule: "repeated",
            type: "MedicalProcedure",
            id: 4
          }
        }
      },
      MedicalSummaryData: {
        fields: {
          interviewSummary: {
            type: "string",
            id: 1
          },
          diagnosisCategory: {
            type: "string",
            id: 2
          },
          cptCode: {
            type: "string",
            id: 3
          },
          plan: {
            type: "string",
            id: 4
          },
          impression: {
            type: "string",
            id: 5
          },
          diagnosticTesting: {
            type: "string",
            id: 6
          }
        }
      },
      Specialist: {
        fields: {
          type: {
            type: "Type",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          avatarUrl: {
            type: "string",
            id: 4
          },
          medicalCategories: {
            rule: "repeated",
            type: "string",
            id: 5
          },
          packageType: {
            type: "PackageType",
            id: 6
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN: 0,
              GP: 1,
              NURSE: 2,
              EXTERNAL: 4
            }
          },
          PackageType: {
            values: {
              UNKOWN_PACKAGE: 0,
              BASIC: 1,
              SILVER: 2,
              GOLD: 3,
              PLATINUM: 4
            }
          }
        }
      },
      PatientRecord: {
        oneofs: {
          created: {
            oneof: [
              "automatically",
              "bySpecialist"
            ]
          },
          type: {
            oneof: [
              "manually",
              "scheduled",
              "urgentCare",
              "call",
              "usBoard"
            ]
          }
        },
        fields: {
          recordId: {
            type: "uint64",
            id: 1
          },
          startDate: {
            type: "generics.DateTime",
            id: 2
          },
          endDate: {
            type: "generics.DateTime",
            id: 3
          },
          medicalSummaryProvided: {
            type: "bool",
            id: 4
          },
          automatically: {
            type: "Automatically",
            id: 5
          },
          bySpecialist: {
            type: "Specialist",
            id: 6
          },
          manually: {
            type: "Manually",
            id: 7
          },
          scheduled: {
            type: "Scheduled",
            id: 8
          },
          urgentCare: {
            type: "UrgentCare",
            id: 9
          },
          call: {
            type: "Call",
            id: 12
          },
          usBoard: {
            type: "USBoard",
            id: 13
          },
          insuranceProviderName: {
            type: "string",
            id: 10
          },
          insuranceMemberId: {
            type: "string",
            id: 11
          }
        },
        nested: {
          Automatically: {
            fields: {}
          },
          Specialist: {
            fields: {
              specialistId: {
                type: "uint64",
                id: 1
              },
              firstName: {
                type: "string",
                id: 2
              },
              lastName: {
                type: "string",
                id: 3
              },
              avatarUrl: {
                type: "string",
                id: 4
              }
            }
          },
          Manually: {
            fields: {
              createdBySpecialistId: {
                type: "uint64",
                id: 1
              },
              withSpecialistId: {
                type: "uint64",
                id: 2
              }
            }
          },
          Call: {
            fields: {
              withSpecialistId: {
                type: "uint64",
                id: 1
              }
            }
          },
          Scheduled: {
            fields: {
              withSpecialistId: {
                type: "uint64",
                id: 1
              }
            }
          },
          UrgentCare: {
            fields: {
              withSpecialistId: {
                type: "uint64",
                id: 1
              }
            }
          },
          USBoard: {
            fields: {
              withSpecialistId: {
                type: "uint64",
                id: 1
              },
              usBoardRequestId: {
                type: "string",
                id: 2
              }
            }
          }
        }
      },
      Invitation: {
        fields: {
          title: {
            type: "generics.Title",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          phoneNumber: {
            type: "string",
            id: 4
          },
          email: {
            type: "string",
            id: 5
          }
        }
      },
      HPI: {
        fields: {
          form: {
            type: "forms.Form",
            id: 1
          },
          insertedAt: {
            type: "generics.DateTime",
            id: 2
          }
        }
      },
      VitalsParams: {
        fields: {
          height: {
            type: "generics.Height",
            id: 1
          },
          weight: {
            type: "generics.Weight",
            id: 2
          },
          bloodPressureSystolic: {
            type: "uint32",
            id: 3
          },
          bloodPressureDiastolic: {
            type: "uint32",
            id: 4
          },
          pulse: {
            type: "uint32",
            id: 5
          },
          respiratoryRate: {
            type: "uint32",
            id: 6
          },
          bodyTemperature: {
            type: "float",
            id: 7
          },
          physicalExam: {
            type: "string",
            id: 8
          }
        }
      },
      OrderedTestsParamsItem: {
        fields: {
          medicalTestId: {
            type: "uint64",
            id: 1
          },
          description: {
            type: "string",
            id: 2
          }
        }
      },
      OrderedTests: {
        fields: {
          items: {
            rule: "repeated",
            type: "OrderedTestsItem",
            id: 1
          }
        }
      },
      OrderedTestsItem: {
        fields: {
          test: {
            type: "MedicalTest",
            id: 1
          },
          description: {
            type: "string",
            id: 2
          }
        }
      },
      Medications: {
        fields: {
          items: {
            rule: "repeated",
            type: "MedicationsItem",
            id: 1
          }
        }
      },
      MedicationsItem: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          direction: {
            type: "string",
            id: 2
          },
          quantity: {
            type: "string",
            id: 3
          },
          refills: {
            type: "uint32",
            id: 4
          }
        }
      },
      Vitals: {
        fields: {
          height: {
            type: "generics.Height",
            id: 1
          },
          weight: {
            type: "generics.Weight",
            id: 2
          },
          bloodPressureSystolic: {
            type: "uint32",
            id: 3
          },
          bloodPressureDiastolic: {
            type: "uint32",
            id: 4
          },
          pulse: {
            type: "uint32",
            id: 5
          },
          respiratoryRate: {
            type: "uint32",
            id: 6
          },
          bodyTemperature: {
            type: "float",
            id: 7
          },
          physicalExam: {
            type: "string",
            id: 8
          },
          recordId: {
            type: "uint64",
            id: 9
          },
          providedByNurseId: {
            type: "uint64",
            id: 10
          },
          insertedAt: {
            type: "generics.DateTime",
            id: 11
          }
        }
      },
      MedicalCondition: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      MedicalProcedure: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      MedicalMedication: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      MedicalTestsCategory: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          tests: {
            rule: "repeated",
            type: "MedicalTest",
            id: 3
          }
        }
      },
      MedicalTest: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      SpecialistEncounter: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          startTime: {
            type: "uint64",
            id: 3
          },
          endTime: {
            type: "uint64",
            id: 4
          },
          type: {
            type: "Type",
            id: 5
          },
          state: {
            type: "State",
            id: 6
          },
          usBoardRequestId: {
            type: "string",
            id: 7
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN_TYPE: 0,
              AUTO: 1,
              MANUAL: 2,
              VISIT: 3,
              CALL: 4,
              US_BOARD: 5,
              IN_OFFICE: 6
            }
          },
          State: {
            values: {
              UNKNOWN_STATE: 0,
              PENDING: 1,
              CANCELED: 2,
              COMPLETED: 3
            }
          }
        }
      },
      GetTestsResponse: {
        fields: {
          bundles: {
            rule: "repeated",
            type: "TestsBundle",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          },
          nextToken: {
            type: "string",
            id: 4
          }
        }
      },
      GetTestResponse: {
        fields: {
          bundle: {
            type: "TestsBundle",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      TestsBundle: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          tests: {
            rule: "repeated",
            type: "Test",
            id: 3
          },
          insertedAt: {
            type: "uint64",
            id: 4
          }
        }
      },
      Test: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          categoryName: {
            type: "string",
            id: 2
          },
          description: {
            type: "string",
            id: 3
          }
        }
      },
      GetMedicationsResponse: {
        fields: {
          bundles: {
            rule: "repeated",
            type: "MedicationsBundle",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          },
          nextToken: {
            type: "string",
            id: 4
          }
        }
      },
      GetMedicationResponse: {
        fields: {
          bundle: {
            type: "MedicationsBundle",
            id: 1
          },
          specialist: {
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      MedicationsBundle: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          medications: {
            rule: "repeated",
            type: "MedicationsItem",
            id: 3
          },
          insertedAt: {
            type: "uint64",
            id: 4
          }
        }
      },
      GetProceduresResponse: {
        fields: {
          bundles: {
            rule: "repeated",
            type: "ProceduresBundle",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          },
          nextToken: {
            type: "string",
            id: 4
          }
        }
      },
      ProceduresBundle: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          procedures: {
            rule: "repeated",
            type: "string",
            id: 3
          },
          insertedAt: {
            type: "uint64",
            id: 4
          }
        }
      }
    }
  },
  forms: {
    options: {
      "(elixir_module_prefix)": "Proto.Forms"
    },
    nested: {
      Form: {
        fields: {
          fields: {
            rule: "repeated",
            type: "FormField",
            id: 1
          },
          completed: {
            type: "bool",
            id: 2
          }
        }
      },
      FormField: {
        oneofs: {
          value: {
            oneof: [
              "select",
              "multiselect",
              "string",
              "integer",
              "month",
              "formFieldsGroup"
            ]
          }
        },
        fields: {
          uuid: {
            type: "string",
            id: 1
          },
          label: {
            type: "string",
            id: 2
          },
          select: {
            type: "Select",
            id: 3
          },
          multiselect: {
            type: "MultiSelect",
            id: 4
          },
          string: {
            type: "StringField",
            id: 5
          },
          integer: {
            type: "IntegerField",
            id: 6
          },
          month: {
            type: "MonthField",
            id: 7
          },
          formFieldsGroup: {
            type: "FormFieldsGroup",
            id: 8
          }
        }
      },
      FormFieldsGroup: {
        fields: {
          formFields: {
            rule: "repeated",
            type: "FormField",
            id: 1
          }
        }
      },
      Select: {
        fields: {
          options: {
            rule: "repeated",
            type: "Option",
            id: 1
          },
          choice: {
            type: "Option",
            id: 2
          }
        },
        nested: {
          Option: {
            fields: {
              uuid: {
                type: "string",
                id: 1
              },
              label: {
                type: "string",
                id: 2
              },
              subform: {
                rule: "repeated",
                type: "FormField",
                id: 3
              }
            }
          }
        }
      },
      MultiSelect: {
        fields: {
          options: {
            rule: "repeated",
            type: "Option",
            id: 1
          },
          choices: {
            rule: "repeated",
            type: "Option",
            id: 2
          },
          allowCustomOption: {
            type: "bool",
            id: 3
          }
        },
        nested: {
          Option: {
            fields: {
              uuid: {
                type: "string",
                id: 1
              },
              label: {
                type: "string",
                id: 2
              },
              subform: {
                rule: "repeated",
                type: "FormField",
                id: 3
              },
              sublabels: {
                rule: "repeated",
                type: "string",
                id: 4
              },
              distinct: {
                type: "bool",
                id: 5
              },
              isCustom: {
                type: "bool",
                id: 6
              }
            }
          }
        }
      },
      StringField: {
        fields: {
          value: {
            type: "string",
            id: 1
          },
          isSet: {
            type: "bool",
            id: 2
          }
        }
      },
      IntegerField: {
        fields: {
          value: {
            type: "int32",
            id: 1
          },
          isSet: {
            type: "bool",
            id: 2
          }
        }
      },
      MonthField: {
        fields: {
          value: {
            type: "int64",
            id: 1
          },
          isSet: {
            type: "bool",
            id: 2
          }
        }
      }
    }
  },
  patient_profile: {
    options: {
      "(elixir_module_prefix)": "Proto.PatientProfile"
    },
    nested: {
      GetBasicInfoResponse: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          }
        }
      },
      UpdateBasicInfoRequest: {
        fields: {
          basicInfoParams: {
            type: "BasicInfoParams",
            id: 1
          }
        }
      },
      UpdateBasicInfoResponse: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          }
        }
      },
      GetBMIResponse: {
        fields: {
          bmi: {
            type: "BMI",
            id: 1
          }
        }
      },
      UpdateBMIRequest: {
        fields: {
          bmi: {
            type: "BMI",
            id: 1
          }
        }
      },
      UpdateBMIResponse: {
        fields: {
          bmi: {
            type: "BMI",
            id: 1
          }
        }
      },
      GetHistoryResponse: {
        fields: {
          social: {
            type: "forms.Form",
            id: 1
          },
          medical: {
            type: "forms.Form",
            id: 2
          },
          surgical: {
            type: "forms.Form",
            id: 3
          },
          family: {
            type: "forms.Form",
            id: 4
          },
          allergy: {
            type: "forms.Form",
            id: 5
          },
          immunization: {
            type: "forms.Form",
            id: 6
          }
        }
      },
      UpdateHistoryRequest: {
        oneofs: {
          updated: {
            oneof: [
              "social",
              "medical",
              "surgical",
              "family",
              "allergy",
              "immunization"
            ]
          }
        },
        fields: {
          social: {
            type: "forms.Form",
            id: 1
          },
          medical: {
            type: "forms.Form",
            id: 2
          },
          surgical: {
            type: "forms.Form",
            id: 3
          },
          family: {
            type: "forms.Form",
            id: 4
          },
          allergy: {
            type: "forms.Form",
            id: 5
          },
          immunization: {
            type: "forms.Form",
            id: 6
          }
        }
      },
      UpdateHistoryResponse: {
        fields: {
          social: {
            type: "forms.Form",
            id: 1
          },
          medical: {
            type: "forms.Form",
            id: 2
          },
          surgical: {
            type: "forms.Form",
            id: 3
          },
          family: {
            type: "forms.Form",
            id: 4
          },
          allergy: {
            type: "forms.Form",
            id: 5
          },
          immunization: {
            type: "forms.Form",
            id: 6
          }
        }
      },
      UpdateAllHistoryRequest: {
        fields: {
          social: {
            type: "forms.Form",
            id: 1
          },
          medical: {
            type: "forms.Form",
            id: 2
          },
          surgical: {
            type: "forms.Form",
            id: 3
          },
          family: {
            type: "forms.Form",
            id: 4
          },
          allergy: {
            type: "forms.Form",
            id: 5
          },
          immunization: {
            type: "forms.Form",
            id: 6
          }
        }
      },
      UpdateAllHistoryResponse: {
        fields: {
          social: {
            type: "forms.Form",
            id: 1
          },
          medical: {
            type: "forms.Form",
            id: 2
          },
          surgical: {
            type: "forms.Form",
            id: 3
          },
          family: {
            type: "forms.Form",
            id: 4
          },
          allergy: {
            type: "forms.Form",
            id: 5
          },
          immunization: {
            type: "forms.Form",
            id: 6
          }
        }
      },
      GetAddressResponse: {
        fields: {
          address: {
            type: "Address",
            id: 1
          }
        }
      },
      UpdateAddressRequest: {
        fields: {
          address: {
            type: "Address",
            id: 1
          }
        }
      },
      UpdateAddressResponse: {
        fields: {
          address: {
            type: "Address",
            id: 1
          }
        }
      },
      GetReviewOfSystemResponse: {
        fields: {
          reviewOfSystem: {
            type: "ReviewOfSystem",
            id: 1
          }
        }
      },
      GetInsuranceResponse: {
        fields: {
          insurance: {
            type: "Insurance",
            id: 1
          }
        }
      },
      GetReviewOfSystemHistoryResponse: {
        fields: {
          reviewOfSystemHistory: {
            rule: "repeated",
            type: "ReviewOfSystem",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 3
          },
          patient: {
            type: "generics.Patient",
            id: 4
          }
        }
      },
      UpdateReviewOfSystemRequest: {
        fields: {
          reviewOfSystem: {
            type: "forms.Form",
            id: 1
          }
        }
      },
      UpdateReviewOfSystemResponse: {
        fields: {
          reviewOfSystem: {
            type: "ReviewOfSystem",
            id: 1
          }
        }
      },
      UpdateInsuranceRequest: {
        fields: {
          memberId: {
            type: "string",
            id: 1
          },
          providerId: {
            type: "uint64",
            id: 2
          }
        }
      },
      UpdateInsuranceResponse: {
        fields: {
          insurance: {
            type: "Insurance",
            id: 1
          }
        }
      },
      DeleteInsuranceResponse: {
        fields: {
          insurance: {
            type: "Insurance",
            id: 1
          }
        }
      },
      GetStatusResponse: {
        fields: {
          onboardingCompleted: {
            type: "bool",
            id: 1
          }
        }
      },
      GetChildrenProfilesResponse: {
        fields: {
          childProfiles: {
            rule: "repeated",
            type: "ChildProfile",
            id: 1
          }
        }
      },
      AddChildProfileRequest: {
        fields: {
          basicInfoParams: {
            type: "BasicInfoParams",
            id: 1
          }
        }
      },
      AddChildProfileResponse: {
        fields: {
          childProfile: {
            type: "ChildProfile",
            id: 1
          }
        }
      },
      GetRelationshipResponse: {
        oneofs: {
          relatedProfiles: {
            oneof: [
              "adult",
              "children"
            ]
          }
        },
        fields: {
          adult: {
            type: "generics.Patient",
            id: 1
          },
          children: {
            type: "ChildrenList",
            id: 2
          }
        }
      },
      ChildrenList: {
        fields: {
          children: {
            rule: "repeated",
            type: "generics.Patient",
            id: 1
          }
        }
      },
      ChildProfile: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          },
          authToken: {
            type: "string",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          }
        }
      },
      BasicInfo: {
        fields: {
          title: {
            type: "generics.Title",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          birthDate: {
            type: "generics.DateTime",
            id: 4
          },
          email: {
            type: "string",
            id: 5
          },
          joinDate: {
            type: "uint64",
            id: 6
          },
          avatarUrl: {
            type: "string",
            id: 7
          },
          gender: {
            type: "generics.Gender",
            id: 8
          },
          isInsured: {
            type: "bool",
            id: 9
          }
        }
      },
      BasicInfoParams: {
        fields: {
          title: {
            type: "generics.Title",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          birthDate: {
            type: "generics.DateTime",
            id: 4
          },
          email: {
            type: "string",
            id: 5
          },
          deprecated1: {
            type: "uint64",
            id: 6
          },
          deprecated2: {
            type: "string",
            id: 7
          },
          avatarResourcePath: {
            type: "string",
            id: 8
          },
          gender: {
            type: "generics.Gender",
            id: 9
          }
        }
      },
      BMI: {
        fields: {
          height: {
            type: "generics.Height",
            id: 1
          },
          weight: {
            type: "generics.Weight",
            id: 2
          }
        }
      },
      BloodPressure: {
        fields: {
          systolic: {
            type: "uint32",
            id: 1
          },
          diastolic: {
            type: "uint32",
            id: 2
          },
          pulse: {
            type: "uint32",
            id: 3
          }
        }
      },
      Address: {
        fields: {
          street: {
            type: "string",
            id: 1
          },
          homeNumber: {
            type: "string",
            id: 2
          },
          zipCode: {
            type: "string",
            id: 3
          },
          city: {
            type: "string",
            id: 4
          },
          country: {
            type: "string",
            id: 5
          },
          additionalNumbers: {
            type: "string",
            id: 6
          },
          neighborhood: {
            type: "string",
            id: 7
          }
        }
      },
      ReviewOfSystem: {
        fields: {
          form: {
            type: "forms.Form",
            id: 1
          },
          insertedAt: {
            type: "uint64",
            id: 2
          },
          providedBySpecialistId: {
            type: "uint64",
            id: 3
          }
        }
      },
      Insurance: {
        fields: {
          memberId: {
            type: "string",
            id: 1
          },
          provider: {
            type: "insurance.Provider",
            id: 2
          }
        }
      }
    }
  },
  insurance: {
    options: {
      "(elixir_module_prefix)": "Proto.Insurance"
    },
    nested: {
      GetProvidersResponse: {
        fields: {
          providers: {
            rule: "repeated",
            type: "Provider",
            id: 1
          }
        }
      },
      Provider: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          logoUrl: {
            type: "string",
            id: 3
          }
        }
      }
    }
  },
  visits: {
    options: {
      "(elixir_module_prefix)": "Proto.Visits"
    },
    nested: {
      VisitType: {
        values: {
          ONLINE: 0,
          IN_OFFICE: 1,
          US_BOARD: 3
        }
      },
      CreateTimeslotsRequest: {
        fields: {
          timeslotParams: {
            rule: "repeated",
            type: "TimeslotParams",
            id: 1
          }
        }
      },
      CreateTimeslotsResponse: {
        fields: {}
      },
      RemoveTimeslotsRequest: {
        fields: {
          timeslotParams: {
            rule: "repeated",
            type: "TimeslotParams",
            id: 1
          }
        }
      },
      RemoveTimeslotsResponse: {
        fields: {}
      },
      GetCalendarResponse: {
        fields: {
          timeslots: {
            rule: "repeated",
            type: "Timeslot",
            id: 1
          }
        }
      },
      GetMedicalCategoryCalendarResponse: {
        fields: {
          medicalCategoryTimeslots: {
            rule: "repeated",
            type: "MedicalCategoryTimeslot",
            id: 1
          }
        }
      },
      GetVisitDemandAvailabilityResponse: {
        fields: {
          isVisitDemandAvailable: {
            type: "bool",
            id: 1
          }
        }
      },
      GetVisitResponse: {
        fields: {
          visit: {
            type: "VisitDataForSpecialist",
            id: 1
          },
          medicalCategory: {
            type: "MedicalCategory",
            id: 2
          }
        }
      },
      GetPatientVisitResponse: {
        fields: {
          visit: {
            type: "VisitDataForPatient",
            id: 1
          }
        }
      },
      CreateVisitRequest: {
        fields: {
          timeslotParams: {
            type: "TimeslotParams",
            id: 1
          },
          chosenMedicalCategoryId: {
            type: "uint64",
            id: 2
          },
          paymentsParams: {
            type: "PaymentsParams",
            id: 3
          },
          userTimezone: {
            type: "string",
            id: 4
          }
        }
      },
      CreateUsBoardVisitRequest: {
        fields: {
          timeslotParams: {
            type: "TimeslotParams",
            id: 1
          },
          usBoardRequestId: {
            type: "string",
            id: 2
          }
        }
      },
      CreateVisitResponse: {
        fields: {
          recordId: {
            type: "uint64",
            id: 1
          }
        }
      },
      CreateTeamMemberVisitRequest: {
        fields: {
          timeslotParams: {
            type: "TimeslotParams",
            id: 1
          },
          chosenMedicalCategoryId: {
            type: "uint64",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          }
        }
      },
      GetVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForPatient",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          }
        }
      },
      GetScheduledVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForPatient",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 3
          },
          nextToken: {
            type: "string",
            id: 2
          }
        }
      },
      GetPendingVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForSpecialist",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 3
          }
        }
      },
      PendingVisitsUpdate: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForSpecialist",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 3
          }
        }
      },
      GetDoctorPendingVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForSpecialist",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          }
        }
      },
      DoctorPendingVisitsUpdate: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForSpecialist",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          }
        }
      },
      GetEndedVisitsResponse: {
        fields: {
          visits: {
            rule: "repeated",
            type: "VisitDataForSpecialist",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          },
          nextToken: {
            type: "string",
            id: 3
          }
        }
      },
      USBoardSecondOpinionRequestsResponse: {
        fields: {
          usBoardSecondOpinionRequests: {
            rule: "repeated",
            type: "USBoardSecondOpinionRequest",
            id: 1
          }
        }
      },
      USBoardSecondOpinionRequestResponse: {
        fields: {
          usBoardSecondOpinionRequest: {
            type: "USBoardSecondOpinionRequest",
            id: 1
          }
        }
      },
      USBoardSecondOpinionRequest: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          specialistId: {
            type: "uint64",
            id: 2
          },
          patientId: {
            type: "uint64",
            id: 3
          },
          visitId: {
            type: "string",
            id: 4
          },
          insertedAt: {
            type: "generics.DateTime",
            id: 5
          },
          patientDescription: {
            type: "string",
            id: 6
          },
          specialistOpinion: {
            type: "string",
            id: 7
          },
          patientEmail: {
            type: "string",
            id: 8
          },
          status: {
            type: "Status",
            id: 9
          },
          files: {
            rule: "repeated",
            type: "USBoardFilesToDownload",
            id: 10
          },
          paymentsParams: {
            type: "PaymentsParams",
            id: 11
          },
          specialistsHistory: {
            rule: "repeated",
            type: "SpecialistHistory",
            id: 12
          }
        },
        nested: {
          Status: {
            values: {
              LANDING_FORM: 0,
              LANDING_BOOKING: 1,
              REQUESTED: 2,
              ASSIGNED: 3,
              REJECTED: 4,
              IN_PROGRESS: 5,
              OPINION_SUBMITTED: 6,
              CALL_SCHEDULED: 7,
              DONE: 8,
              CANCELLED: 9,
              LANDING_PAYMENT_PENDING: 10
            }
          }
        }
      },
      RequestUSBoardSecondOpinionRequest: {
        fields: {
          patientDescription: {
            type: "string",
            id: 1
          },
          patientEmail: {
            type: "string",
            id: 2
          },
          paymentsParams: {
            type: "PaymentsParams",
            id: 3
          },
          files: {
            rule: "repeated",
            type: "USBoardFiles",
            id: 4
          }
        }
      },
      LandingRequestUSBoardSecondOpinionRequest: {
        fields: {
          patientDescription: {
            type: "string",
            id: 1
          },
          patientEmail: {
            type: "string",
            id: 2
          },
          files: {
            rule: "repeated",
            type: "USBoardFiles",
            id: 3
          },
          phoneNumber: {
            type: "string",
            id: 4
          },
          firstName: {
            type: "string",
            id: 5
          },
          lastName: {
            type: "string",
            id: 6
          }
        }
      },
      LandingRequestUSBoardSecondOpinionResponse: {
        fields: {
          paymentUrl: {
            type: "string",
            id: 1
          },
          secondOpinionRequestId: {
            type: "string",
            id: 2
          }
        }
      },
      LandingConfirmUSBoardSecondOpinionRequest: {
        fields: {
          transactionReference: {
            type: "string",
            id: 1
          },
          secondOpinionRequestId: {
            type: "string",
            id: 2
          }
        }
      },
      LandingUSBoardContactFormRequest: {
        fields: {
          patientEmail: {
            type: "string",
            id: 1
          },
          patientDescription: {
            type: "string",
            id: 2
          }
        }
      },
      RequestUSBoardSecondOpinionResponse: {
        fields: {
          id: {
            type: "string",
            id: 1
          }
        }
      },
      USBoardFilesToDownload: {
        fields: {
          downloadUrl: {
            type: "string",
            id: 1
          }
        }
      },
      USBoardFiles: {
        fields: {
          path: {
            type: "string",
            id: 1
          }
        }
      },
      GetSpecialistsUSBoardOpinions: {
        fields: {
          requestedOpinions: {
            rule: "repeated",
            type: "SpecialistsUSBoardOpinion",
            id: 1
          }
        }
      },
      SpecialistsUSBoardOpinion: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          patient: {
            type: "USBoardPatient",
            id: 2
          },
          status: {
            type: "USBoardSecondOpinionRequest.Status",
            id: 3
          },
          acceptedAt: {
            type: "generics.DateTime",
            id: 4
          },
          rejectedAt: {
            type: "generics.DateTime",
            id: 5
          },
          assignedAt: {
            type: "generics.DateTime",
            id: 6
          }
        }
      },
      USBoardPatient: {
        fields: {
          firstName: {
            type: "string",
            id: 1
          },
          lastName: {
            type: "string",
            id: 2
          },
          email: {
            type: "string",
            id: 3
          },
          gender: {
            type: "generics.Gender",
            id: 4
          },
          birthDate: {
            type: "generics.DateTime",
            id: 5
          },
          avatarUrl: {
            type: "string",
            id: 6
          }
        }
      },
      USBoardRequestDetails: {
        fields: {
          files: {
            rule: "repeated",
            type: "USBoardFilesToDownload",
            id: 1
          },
          patientDescription: {
            type: "string",
            id: 2
          },
          specialistOpinion: {
            type: "string",
            id: 3
          },
          id: {
            type: "string",
            id: 4
          },
          status: {
            type: "USBoardSecondOpinionRequest.Status",
            id: 5
          },
          insertedAt: {
            type: "generics.DateTime",
            id: 6
          }
        }
      },
      PostUSBoardSpecialistOpinion: {
        fields: {
          specialistOpinion: {
            type: "string",
            id: 1
          }
        }
      },
      VisitDataForPatient: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          startTime: {
            type: "uint64",
            id: 2
          },
          specialistId: {
            type: "uint64",
            id: 3
          },
          patientId: {
            type: "uint64",
            id: 5
          },
          recordId: {
            type: "uint64",
            id: 6
          },
          id: {
            type: "string",
            id: 7
          },
          paymentsParams: {
            type: "PaymentsParams",
            id: 8
          },
          medicalCategory: {
            type: "MedicalCategory",
            id: 9
          },
          visitType: {
            type: "Type",
            id: 10
          },
          deprecated1: {
            type: "uint64",
            id: 4
          }
        },
        nested: {
          Status: {
            values: {
              UNKNOWN: 0,
              SCHEDULED: 1,
              ONGOING: 2,
              DONE: 3,
              CANCELED: 4
            }
          },
          Type: {
            values: {
              ONLINE: 0,
              IN_OFFICE: 1,
              US_BOARD: 2
            }
          }
        }
      },
      VisitDataForSpecialist: {
        fields: {
          id: {
            type: "string",
            id: 1
          },
          patientId: {
            type: "uint64",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          },
          scheduledWith: {
            type: "uint64",
            id: 4
          },
          startsAt: {
            type: "uint64",
            id: 5
          },
          scheduledAt: {
            type: "uint64",
            id: 6
          },
          chosenMedicalCategoryId: {
            type: "uint64",
            id: 7
          },
          state: {
            type: "State",
            id: 8
          },
          type: {
            type: "Type",
            id: 9
          }
        },
        nested: {
          State: {
            values: {
              UNKNOWN: 0,
              PENDING: 1,
              ENDED: 3
            }
          },
          Type: {
            values: {
              ONLINE: 0,
              IN_OFFICE: 1,
              US_BOARD: 2
            }
          }
        }
      },
      TimeslotParams: {
        fields: {
          startTime: {
            type: "uint64",
            id: 1
          },
          visitType: {
            type: "Timeslot.Free.FreeTimeslotType",
            id: 2
          }
        }
      },
      PaymentsParams: {
        fields: {
          amount: {
            type: "string",
            id: 1
          },
          currency: {
            type: "string",
            id: 2
          },
          transactionReference: {
            type: "string",
            id: 3
          },
          paymentMethod: {
            type: "PaymentMethod",
            id: 4
          }
        },
        nested: {
          PaymentMethod: {
            values: {
              TELR: 0,
              EXTERNAL: 1,
              US_BOARD: 2
            }
          }
        }
      },
      SpecialistHistory: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          rejectedAt: {
            type: "generics.DateTime",
            id: 2
          },
          acceptedAt: {
            type: "generics.DateTime",
            id: 3
          },
          specialistFirstName: {
            type: "string",
            id: 4
          },
          specialistLastName: {
            type: "string",
            id: 5
          },
          assignedAt: {
            type: "generics.DateTime",
            id: 6
          }
        }
      },
      GetPaymentForVisit: {
        fields: {
          amount: {
            type: "string",
            id: 1
          },
          currency: {
            type: "string",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          },
          paymentMethod: {
            type: "string",
            id: 4
          }
        }
      },
      Timeslot: {
        oneofs: {
          status: {
            oneof: [
              "free",
              "taken"
            ]
          }
        },
        fields: {
          startTime: {
            type: "uint64",
            id: 1
          },
          free: {
            type: "Free",
            id: 3
          },
          taken: {
            type: "Taken",
            id: 4
          }
        },
        nested: {
          VisitState: {
            values: {
              UNKNOWN: 0,
              PENDING: 1
            }
          },
          Free: {
            fields: {
              visitType: {
                type: "FreeTimeslotType",
                id: 1
              }
            },
            nested: {
              FreeTimeslotType: {
                values: {
                  ONLINE: 0,
                  IN_OFFICE: 1,
                  BOTH: 2,
                  US_BOARD: 3
                }
              }
            }
          },
          Taken: {
            fields: {
              patientId: {
                type: "uint64",
                id: 1
              },
              recordId: {
                type: "uint64",
                id: 2
              },
              visitState: {
                type: "VisitState",
                id: 3
              },
              visitId: {
                type: "string",
                id: 4
              },
              visitType: {
                type: "VisitType",
                id: 5
              }
            }
          }
        }
      },
      MedicalCategoryTimeslot: {
        fields: {
          startTime: {
            type: "uint64",
            id: 1
          },
          availableSpecialistIds: {
            rule: "repeated",
            type: "uint64",
            id: 2
          }
        }
      },
      MedicalCategory: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          parentCategoryId: {
            type: "uint64",
            id: 3
          }
        }
      },
      DaySchedule: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          specialistId: {
            type: "uint64",
            id: 2
          },
          date: {
            type: "generics.DateTime",
            id: 3
          },
          freeTimeslots: {
            rule: "repeated",
            type: "Timeslot",
            id: 4
          },
          takenTimeslots: {
            rule: "repeated",
            type: "Timeslot",
            id: 5
          },
          freeTimeslotsCount: {
            type: "uint64",
            id: 6
          },
          takenTimeslotsCount: {
            type: "uint64",
            id: 7
          }
        }
      },
      GetUploadedDocuments: {
        fields: {
          documentUrls: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      },
      MoveVisitToCanceledResponse: {
        fields: {
          refund: {
            type: "bool",
            id: 1
          }
        }
      }
    }
  },
  membership: {
    options: {
      "(elixir_module_prefix)": "Proto.Membership"
    },
    nested: {
      GetPackagesListResponse: {
        fields: {
          packages: {
            rule: "repeated",
            type: "Package",
            id: 1
          }
        }
      },
      Package: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          price: {
            type: "string",
            id: 2
          },
          features: {
            rule: "repeated",
            type: "Feature",
            id: 3
          },
          type: {
            type: "string",
            id: 4
          },
          missingFeatures: {
            rule: "repeated",
            type: "Feature",
            id: 5
          }
        },
        nested: {
          Feature: {
            fields: {
              text: {
                type: "string",
                id: 1
              },
              bold: {
                type: "bool",
                id: 2
              },
              description: {
                type: "string",
                id: 3
              }
            }
          }
        }
      },
      GetActivePackageResponse: {
        fields: {
          activePackage: {
            type: "Package",
            id: 1
          },
          expiresAt: {
            type: "generics.DateTime",
            id: 2
          },
          nextPackage: {
            type: "Package",
            id: 3
          }
        }
      },
      GetPendingSubscriptionResponse: {
        fields: {
          redirectUrl: {
            type: "string",
            id: 1
          }
        }
      },
      SubscribeRequest: {
        fields: {
          type: {
            type: "string",
            id: 1
          }
        }
      },
      SubscribeResponse: {
        fields: {
          redirectUrl: {
            type: "string",
            id: 1
          }
        }
      },
      VerifyRequest: {
        fields: {
          orderId: {
            type: "string",
            id: 1
          }
        }
      },
      VerifyResponse: {
        fields: {
          status: {
            type: "Status",
            id: 1
          },
          "package": {
            type: "Package",
            id: 2
          }
        },
        nested: {
          Status: {
            values: {
              UNKNOWN: 0,
              PAID: 1,
              DECLINED: 2
            }
          }
        }
      },
      ActivePackageUpdate: {
        fields: {
          type: {
            type: "string",
            id: 1
          }
        }
      }
    }
  },
  notifications: {
    options: {
      "(elixir_module_prefix)": "Proto.Notifications"
    },
    nested: {
      GetNotificationsResponse: {
        fields: {
          notifications: {
            rule: "repeated",
            type: "Notification",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          unreadNotificationsCounter: {
            type: "uint32",
            id: 3
          },
          nextToken: {
            type: "string",
            id: 4
          }
        }
      },
      NotificationsCounterResponse: {
        fields: {
          unreadNotificationsCounter: {
            type: "uint32",
            id: 1
          }
        }
      },
      MarkAllNotificationsAsReadResponse: {
        fields: {}
      },
      NewNotification: {
        fields: {
          notification: {
            type: "Notification",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          unreadNotificationsCounter: {
            type: "uint32",
            id: 3
          }
        }
      },
      Notification: {
        oneofs: {
          type: {
            oneof: [
              "timelineItemCommentNotification"
            ]
          }
        },
        fields: {
          id: {
            type: "string",
            id: 1
          },
          createdAt: {
            type: "uint64",
            id: 2
          },
          read: {
            type: "bool",
            id: 3
          },
          timelineItemCommentNotification: {
            type: "TimelineItemCommentNotification",
            id: 4
          }
        }
      },
      TimelineItemCommentNotification: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          recordId: {
            type: "uint64",
            id: 2
          },
          timelineItemId: {
            type: "string",
            id: 3
          },
          timelineItemComment: {
            type: "emr.TimelineItemComment",
            id: 4
          },
          commentedOn: {
            type: "string",
            id: 5
          }
        }
      },
      GetPatientNotificationsResponse: {
        fields: {
          notifications: {
            rule: "repeated",
            type: "PatientNotification",
            id: 1
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          },
          nextToken: {
            type: "string",
            id: 3
          }
        }
      },
      PatientNotification: {
        oneofs: {
          type: {
            oneof: [
              "medicalSummarySubmittedNotification",
              "testsOrderedNotification",
              "medicationsAssignedNotification"
            ]
          }
        },
        fields: {
          id: {
            type: "string",
            id: 1
          },
          createdAt: {
            type: "uint64",
            id: 2
          },
          read: {
            type: "bool",
            id: 3
          },
          medicalSummarySubmittedNotification: {
            type: "MedicalSummarySubmittedNotification",
            id: 4
          },
          testsOrderedNotification: {
            type: "TestsOrderedNotification",
            id: 5
          },
          medicationsAssignedNotification: {
            type: "MedicationsAssignedNotification",
            id: 6
          }
        }
      },
      MedicalSummarySubmittedNotification: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          medicalSummary: {
            type: "MedicalSummary",
            id: 2
          }
        },
        nested: {
          MedicalSummary: {
            fields: {
              id: {
                type: "uint64",
                id: 1
              },
              recordId: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      },
      TestsOrderedNotification: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          testsBundle: {
            type: "TestsBundle",
            id: 2
          }
        },
        nested: {
          TestsBundle: {
            fields: {
              id: {
                type: "uint64",
                id: 1
              },
              recordId: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      },
      MedicationsAssignedNotification: {
        fields: {
          specialistId: {
            type: "uint64",
            id: 1
          },
          medicationsBundle: {
            type: "MedicationsBundle",
            id: 2
          }
        },
        nested: {
          MedicationsBundle: {
            fields: {
              id: {
                type: "uint64",
                id: 1
              },
              recordId: {
                type: "uint64",
                id: 2
              }
            }
          }
        }
      }
    }
  },
  presence: {
    options: {
      "(elixir_module_prefix)": "Proto.Presence"
    },
    nested: {
      PresenceState: {
        fields: {
          presences: {
            rule: "repeated",
            type: "Presence",
            id: 1
          }
        }
      },
      PresenceDiff: {
        fields: {
          joins: {
            rule: "repeated",
            type: "Presence",
            id: 1
          },
          leaves: {
            rule: "repeated",
            type: "Presence",
            id: 2
          }
        }
      },
      Presence: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          metadata: {
            rule: "repeated",
            type: "Metadata",
            id: 2
          }
        }
      },
      Metadata: {
        fields: {
          phxRef: {
            type: "string",
            id: 1
          }
        }
      }
    }
  },
  timeline: {
    options: {
      "(elixir_module_prefix)": "Proto.Timeline"
    },
    nested: {
      GetTimelineResponse: {
        fields: {
          timeline: {
            type: "Timeline",
            id: 1
          },
          deprecated: {
            rule: "repeated",
            type: "Specialist",
            id: 2
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 3
          }
        }
      },
      NewTimelineItem: {
        fields: {
          recordId: {
            type: "uint64",
            id: 1
          },
          timelineItem: {
            type: "TimelineItem",
            id: 2
          },
          specialist: {
            type: "Specialist",
            id: 3
          },
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 4
          }
        }
      },
      Timeline: {
        fields: {
          timelineItems: {
            rule: "repeated",
            type: "TimelineItem",
            id: 1
          }
        }
      },
      TimelineItem: {
        oneofs: {
          item: {
            oneof: [
              "call",
              "dispatchRequest",
              "vitals",
              "doctorInvitation",
              "providedHpi",
              "callRecording",
              "vitalsV2",
              "orderedTests",
              "medications"
            ]
          }
        },
        fields: {
          id: {
            type: "string",
            id: 8
          },
          timestamp: {
            type: "uint64",
            id: 1
          },
          commentsCounter: {
            type: "uint32",
            id: 9
          },
          call: {
            type: "Call",
            id: 2
          },
          dispatchRequest: {
            type: "DispatchRequest",
            id: 3
          },
          vitals: {
            type: "Vitals",
            id: 4
          },
          doctorInvitation: {
            type: "DoctorInvitation",
            id: 5
          },
          providedHpi: {
            type: "ProvidedHPI",
            id: 6
          },
          callRecording: {
            type: "CallRecording",
            id: 7
          },
          vitalsV2: {
            type: "emr.Vitals",
            id: 10
          },
          orderedTests: {
            type: "OrderedTests",
            id: 11
          },
          medications: {
            type: "Medications",
            id: 12
          }
        },
        nested: {
          Call: {
            fields: {
              specialistId: {
                type: "uint64",
                id: 1
              },
              categoryId: {
                type: "uint64",
                id: 2
              }
            }
          },
          DispatchRequest: {
            fields: {
              requesterId: {
                type: "uint64",
                id: 1
              },
              patientLocation: {
                type: "dispatches.PatientLocation",
                id: 2
              }
            }
          },
          Vitals: {
            fields: {
              nurseId: {
                type: "uint64",
                id: 1
              },
              vitalsEntry: {
                type: "vitals.VitalsEntry",
                id: 2
              }
            }
          },
          OrderedTests: {
            fields: {
              specialistId: {
                type: "uint64",
                id: 1
              },
              items: {
                rule: "repeated",
                type: "emr.OrderedTestsItem",
                id: 2
              }
            }
          },
          Medications: {
            fields: {
              specialistId: {
                type: "uint64",
                id: 1
              },
              items: {
                rule: "repeated",
                type: "emr.MedicationsItem",
                id: 2
              }
            }
          },
          DoctorInvitation: {
            fields: {
              specialistId: {
                type: "uint64",
                id: 1
              },
              medicalCategoryId: {
                type: "uint64",
                id: 2
              }
            }
          },
          ProvidedHPI: {
            fields: {
              hpi: {
                type: "emr.HPI",
                id: 1
              },
              specialistId: {
                type: "uint64",
                id: 2
              }
            }
          },
          CallRecording: {
            fields: {
              videoUrl: {
                type: "string",
                id: 1
              },
              thumbnailUrl: {
                type: "string",
                id: 2
              },
              sessionId: {
                type: "string",
                id: 3
              }
            }
          }
        }
      },
      Specialist: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          avatarUrl: {
            type: "string",
            id: 4
          },
          type: {
            type: "Type",
            id: 5
          },
          medicalCategories: {
            rule: "repeated",
            type: "string",
            id: 6
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN: 0,
              GP: 1,
              NURSE: 2,
              EXTERNAL: 4
            }
          }
        }
      }
    }
  },
  vitals: {
    options: {
      "(elixir_module_prefix)": "Proto.Vitals"
    },
    nested: {
      VitalsEntry: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          bmi: {
            type: "patient_profile.BMI",
            id: 2
          },
          bloodPressure: {
            type: "patient_profile.BloodPressure",
            id: 3
          },
          ekg: {
            type: "EKG",
            id: 4
          }
        }
      },
      EKG: {
        fields: {
          fileUrl: {
            type: "string",
            id: 1
          }
        }
      }
    }
  },
  devices: {
    options: {
      "(elixir_module_prefix)": "Proto.Devices"
    },
    nested: {
      RegisterDeviceRequest: {
        fields: {
          firebaseToken: {
            type: "string",
            id: 1
          }
        }
      },
      RegisterDeviceResponse: {
        fields: {}
      },
      UnregisterDeviceRequest: {
        fields: {
          firebaseToken: {
            type: "string",
            id: 1
          }
        }
      },
      UnregisterDeviceResponse: {
        fields: {}
      },
      RegisterIOSDeviceRequest: {
        fields: {
          deviceToken: {
            type: "string",
            id: 1
          }
        }
      },
      RegisterIOSDeviceResponse: {
        fields: {}
      },
      UnregisterIOSDeviceRequest: {
        fields: {
          deviceToken: {
            type: "string",
            id: 1
          }
        }
      },
      UnregisterIOSDeviceResponse: {
        fields: {}
      }
    }
  },
  errors: {
    options: {
      "(elixir_module_prefix)": "Proto.Errors"
    },
    nested: {
      ErrorResponse: {
        fields: {
          simpleError: {
            type: "SimpleError",
            id: 1
          },
          formErrors: {
            type: "FormErrors",
            id: 2
          }
        }
      },
      SimpleError: {
        fields: {
          message: {
            type: "string",
            id: 1
          }
        }
      },
      FormErrors: {
        fields: {
          fieldErrors: {
            rule: "repeated",
            type: "FieldError",
            id: 1
          }
        },
        nested: {
          FieldError: {
            fields: {
              field: {
                type: "string",
                id: 1
              },
              message: {
                type: "string",
                id: 2
              }
            }
          }
        }
      }
    }
  },
  feature_flags: {
    options: {
      "(elixir_module_prefix)": "Proto.FeatureFlags"
    },
    nested: {
      VerifyResponse: {
        fields: {
          enabled: {
            type: "bool",
            id: 1
          }
        }
      }
    }
  },
  medical_categories: {
    options: {
      "(elixir_module_prefix)": "Proto.MedicalCategories"
    },
    nested: {
      GetMedicalCategoriesResponse: {
        fields: {
          categories: {
            rule: "repeated",
            type: "MedicalCategory",
            id: 1
          }
        }
      },
      GetMedicalCategoryResponse: {
        fields: {
          category: {
            type: "MedicalCategory",
            id: 1
          },
          subcategories: {
            rule: "repeated",
            type: "MedicalCategory",
            id: 2
          }
        }
      },
      GetMedicalCategoryFeaturedDoctorsResponse: {
        fields: {
          deprecated: {
            rule: "repeated",
            type: "doctors.FeaturedDoctor",
            id: 1
          },
          featuredDoctors: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      GetAllMedicalCategoriesResponse: {
        fields: {
          categories: {
            rule: "repeated",
            type: "MedicalCategoryBase",
            id: 1
          }
        }
      },
      UpdateMedicalCategoryResponse: {
        fields: {
          categories: {
            type: "MedicalCategoryBase",
            id: 1
          }
        }
      },
      UpdateMedicalCategoryRequest: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          disabled: {
            type: "bool",
            id: 2
          },
          position: {
            type: "uint64",
            id: 3
          }
        }
      },
      MedicalCategory: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          imageUrl: {
            type: "string",
            id: 3
          },
          iconUrl: {
            type: "string",
            id: 4
          },
          whatWeTreatUrl: {
            type: "string",
            id: 5
          },
          visitType: {
            type: "VisitType",
            id: 6
          }
        },
        nested: {
          VisitType: {
            values: {
              ONLINE: 0,
              IN_OFFICE: 1,
              BOTH: 2
            }
          }
        }
      },
      MedicalCategoryBase: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          parentCategoryId: {
            type: "uint64",
            id: 3
          }
        }
      }
    }
  },
  doctors: {
    options: {
      "(elixir_module_prefix)": "Proto.Doctors"
    },
    nested: {
      GetFeaturedDoctorsResponse: {
        fields: {
          deprecated: {
            rule: "repeated",
            type: "FeaturedDoctor",
            id: 1
          },
          featuredDoctors: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      FeaturedDoctor: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          avatarUrl: {
            type: "string",
            id: 2
          },
          firstName: {
            type: "string",
            id: 3
          },
          lastName: {
            type: "string",
            id: 4
          },
          categories: {
            rule: "repeated",
            type: "string",
            id: 5
          },
          packageType: {
            type: "PackageType",
            id: 6
          }
        }
      },
      GetFavouriteProvidersResponse: {
        fields: {
          deprecated: {
            rule: "repeated",
            type: "FavouriteProvider",
            id: 1
          },
          favouriteProviders: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      FavouriteProvider: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          avatarUrl: {
            type: "string",
            id: 2
          },
          firstName: {
            type: "string",
            id: 3
          },
          lastName: {
            type: "string",
            id: 4
          },
          categories: {
            rule: "repeated",
            type: "string",
            id: 5
          },
          packageType: {
            type: "PackageType",
            id: 6
          }
        }
      },
      GetDoctorsDetailsResponse: {
        fields: {
          deprecated: {
            rule: "repeated",
            type: "DoctorDetails",
            id: 1
          },
          doctorsDetails: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      DoctorDetails: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          avatarUrl: {
            type: "string",
            id: 2
          },
          firstName: {
            type: "string",
            id: 3
          },
          lastName: {
            type: "string",
            id: 4
          },
          categories: {
            rule: "repeated",
            type: "string",
            id: 5
          },
          packageType: {
            type: "PackageType",
            id: 6
          }
        }
      },
      PackageType: {
        values: {
          UNKOWN: 0,
          BASIC: 1,
          SILVER: 2,
          GOLD: 3,
          PLATINUM: 4
        }
      }
    }
  },
  panel_authentication: {
    options: {
      "(elixir_module_prefix)": "Proto.PanelAuthentication"
    },
    nested: {
      LoginRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          },
          password: {
            type: "string",
            id: 2
          }
        }
      },
      LoginResponse: {
        fields: {
          authToken: {
            type: "string",
            id: 1
          },
          type: {
            type: "Type",
            id: 2
          },
          activePackageType: {
            type: "string",
            id: 3
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN: 0,
              GP: 1,
              NURSE: 2,
              EXTERNAL: 4
            }
          },
          ApprovalStatus: {
            values: {
              UNKNOWN_STATUS: 0,
              WAITING: 1,
              VERIFIED: 2,
              REJECTED: 3
            }
          }
        }
      },
      SendPasswordRecoveryRequest: {
        fields: {
          email: {
            type: "string",
            id: 1
          }
        }
      },
      SendPasswordRecoveryResponse: {
        fields: {}
      },
      RecoverPasswordRequest: {
        fields: {
          passwordRecoveryToken: {
            type: "string",
            id: 1
          },
          newPassword: {
            type: "string",
            id: 2
          }
        }
      },
      RecoverPasswordResponse: {
        fields: {}
      },
      SignupRequest: {
        fields: {
          email: {
            type: "string",
            id: 2
          },
          password: {
            type: "string",
            id: 3
          }
        }
      },
      SignupResponse: {
        fields: {}
      },
      VerifyRequest: {
        fields: {
          verificationToken: {
            type: "string",
            id: 1
          }
        }
      },
      VerifyResponse: {
        fields: {
          authToken: {
            type: "string",
            id: 1
          }
        }
      },
      ChangePasswordRequest: {
        fields: {
          password: {
            type: "string",
            id: 1
          }
        }
      },
      ChangePasswordResponse: {
        fields: {}
      },
      ConfirmPasswordChangeRequest: {
        fields: {
          confirmationToken: {
            type: "string",
            id: 1
          }
        }
      },
      ConfirmPasswordChangeResponse: {
        fields: {}
      },
      SendSpecialistAccountDeletionRequest: {
        fields: {}
      }
    }
  },
  payouts: {
    options: {
      "(elixir_module_prefix)": "Proto.Payouts"
    },
    nested: {
      GetCredentialsResponse: {
        fields: {
          credentials: {
            type: "Credentials",
            id: 1
          }
        }
      },
      UpdateCredentialsRequest: {
        fields: {
          credentials: {
            type: "Credentials",
            id: 1
          }
        }
      },
      Credentials: {
        fields: {
          iban: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          address: {
            type: "string",
            id: 3
          },
          bankName: {
            type: "string",
            id: 4
          },
          bankAddress: {
            type: "string",
            id: 5
          },
          bankSwiftCode: {
            type: "string",
            id: 6
          },
          bankRoutingNumber: {
            type: "string",
            id: 7
          }
        }
      },
      GetPendingWithdrawalsResponse: {
        fields: {
          pendingWithdrawals: {
            rule: "repeated",
            type: "PendingWithdrawal",
            id: 1
          },
          patients: {
            rule: "repeated",
            type: "generics.Patient",
            id: 2
          }
        }
      },
      PendingWithdrawal: {
        fields: {
          patientId: {
            type: "uint64",
            id: 1
          },
          medicalCategoryId: {
            type: "uint64",
            id: 2
          },
          amount: {
            type: "uint64",
            id: 3
          },
          insertedAt: {
            type: "uint64",
            id: 4
          },
          recordId: {
            type: "uint64",
            id: 5
          }
        }
      },
      GetWithdrawalsSummaryResponse: {
        fields: {
          withdrawalsSummary: {
            type: "WithdrawalsSummary",
            id: 1
          }
        }
      },
      WithdrawalsSummary: {
        fields: {
          incomingWithdraw: {
            type: "uint64",
            id: 1
          },
          earnedThisMonth: {
            type: "uint64",
            id: 2
          }
        }
      }
    }
  },
  specialist_profile: {
    options: {
      "(elixir_module_prefix)": "Proto.SpecialistProfile"
    },
    nested: {
      GetCredentialsResponse: {
        fields: {
          credentials: {
            type: "Credentials",
            id: 1
          }
        }
      },
      GetBasicInfoResponse: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          }
        }
      },
      UpdateBasicInfoRequest: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          }
        }
      },
      UpdateBasicInfoResponse: {
        fields: {
          basicInfo: {
            type: "BasicInfo",
            id: 1
          }
        }
      },
      GetBioResponse: {
        fields: {
          bio: {
            type: "Bio",
            id: 1
          }
        }
      },
      UpdateBioRequest: {
        fields: {
          bio: {
            type: "Bio",
            id: 1
          }
        }
      },
      UpdateBioResponse: {
        fields: {
          bio: {
            type: "Bio",
            id: 1
          }
        }
      },
      GetLocationResponse: {
        fields: {
          location: {
            type: "Location",
            id: 1
          }
        }
      },
      GetPricesResponse: {
        fields: {
          categoriesPrices: {
            rule: "repeated",
            type: "CategoryPricesResponse",
            id: 1
          }
        }
      },
      UpdatePricesRequest: {
        fields: {
          categoryPrices: {
            type: "CategoryPricesRequest",
            id: 1
          }
        }
      },
      UpdatePricesResponse: {
        fields: {
          categoryPrices: {
            type: "CategoryPricesResponse",
            id: 1
          }
        }
      },
      UpdateLocationRequest: {
        fields: {
          location: {
            type: "Location",
            id: 1
          }
        }
      },
      UpdateLocationResponse: {
        fields: {
          location: {
            type: "Location",
            id: 1
          }
        }
      },
      GetMedicalCredentialsResponse: {
        fields: {
          medicalCredentials: {
            type: "MedicalCredentials",
            id: 1
          }
        }
      },
      UpdateMedicalCredentialsRequest: {
        fields: {
          medicalCredentials: {
            type: "MedicalCredentials",
            id: 1
          }
        }
      },
      UpdateMedicalCredentialsResponse: {
        fields: {
          medicalCredentials: {
            type: "MedicalCredentials",
            id: 1
          }
        }
      },
      GetMedicalCategoriesResponse: {
        fields: {
          medicalCategories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 1
          }
        }
      },
      UpdateMedicalCategoriesRequest: {
        fields: {
          medicalCategories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 1
          }
        }
      },
      UpdateMedicalCategoriesResponse: {
        fields: {
          medicalCategories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 1
          }
        }
      },
      UpdateMedicalInfoRequest: {
        fields: {
          medicalInfo: {
            type: "MedicalInfo",
            id: 1
          }
        }
      },
      UpdateMedicalInfoResponse: {
        fields: {
          medicalInfo: {
            type: "MedicalInfo",
            id: 1
          }
        }
      },
      GetStatusResponse: {
        fields: {
          status: {
            type: "Status",
            id: 1
          }
        }
      },
      Credentials: {
        fields: {
          email: {
            type: "string",
            id: 2
          }
        }
      },
      GetSpecialistsInCategoryResponse: {
        fields: {
          specialists: {
            rule: "repeated",
            type: "generics.Specialist",
            id: 1
          }
        }
      },
      GetSpecialistsResponse: {
        fields: {
          specialists: {
            rule: "repeated",
            type: "DetailedSpecialist",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        }
      },
      DetailedSpecialist: {
        fields: {
          specialist: {
            type: "generics.Specialist",
            id: 1
          },
          country: {
            type: "string",
            id: 2
          }
        }
      },
      BasicInfo: {
        fields: {
          title: {
            type: "generics.Title",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          birthDate: {
            type: "generics.DateTime",
            id: 4
          },
          imageUrl: {
            type: "string",
            id: 5
          },
          phoneNumber: {
            type: "string",
            id: 6
          },
          gender: {
            type: "generics.Gender",
            id: 7
          },
          medicalTitle: {
            type: "generics.MedicalTitle",
            id: 8
          }
        }
      },
      Location: {
        fields: {
          street: {
            type: "string",
            id: 1
          },
          number: {
            type: "string",
            id: 2
          },
          postalCode: {
            type: "string",
            id: 4
          },
          city: {
            type: "string",
            id: 5
          },
          country: {
            type: "string",
            id: 6
          },
          additionalNumbers: {
            type: "string",
            id: 7
          },
          neighborhood: {
            type: "string",
            id: 8
          },
          formattedAddress: {
            type: "string",
            id: 9
          },
          coordinates: {
            type: "generics.Coordinates",
            id: 10
          }
        }
      },
      MedicalCredentials: {
        fields: {
          deaNumberUrl: {
            type: "string",
            id: 1
          },
          deaNumberExpiryDate: {
            type: "generics.DateTime",
            id: 2
          },
          boardCertificationUrl: {
            type: "string",
            id: 3
          },
          boardCertificationExpiryDate: {
            type: "generics.DateTime",
            id: 4
          },
          currentStateLicenseNumberUrl: {
            type: "string",
            id: 5
          },
          currentStateLicenseNumberExpiryDate: {
            type: "generics.DateTime",
            id: 6
          }
        }
      },
      MedicalCategories: {
        fields: {
          categories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 1
          }
        }
      },
      Status: {
        fields: {
          onboardingCompleted: {
            type: "bool",
            id: 1
          },
          approvalStatus: {
            type: "ApprovalStatus",
            id: 2
          },
          packageType: {
            type: "PackageType",
            id: 3
          },
          trialEndsAt: {
            type: "uint64",
            id: 4
          },
          hasSeenPricingTables: {
            type: "bool",
            id: 5
          }
        },
        nested: {
          ApprovalStatus: {
            values: {
              UNKNOWN_STATUS: 0,
              WAITING: 1,
              VERIFIED: 2,
              REJECTED: 3
            }
          },
          PackageType: {
            values: {
              UNKNOWN_PACKAGE: 0,
              BASIC: 1,
              SILVER: 2,
              GOLD: 3,
              PLATINUM: 4
            }
          }
        }
      },
      MedicalInfo: {
        fields: {
          medicalCredentials: {
            type: "MedicalCredentials",
            id: 1
          },
          medicalCategories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 2
          }
        }
      },
      Bio: {
        fields: {
          description: {
            type: "string",
            id: 1
          },
          education: {
            rule: "repeated",
            type: "EducationEntry",
            id: 2
          },
          workExperience: {
            rule: "repeated",
            type: "WorkExperienceEntry",
            id: 3
          }
        }
      },
      EducationEntry: {
        fields: {
          school: {
            type: "string",
            id: 1
          },
          fieldOfStudy: {
            type: "string",
            id: 2
          },
          degree: {
            type: "string",
            id: 3
          },
          startYear: {
            type: "uint32",
            id: 4
          },
          endYear: {
            type: "uint32",
            id: 5
          }
        }
      },
      WorkExperienceEntry: {
        fields: {
          institution: {
            type: "string",
            id: 1
          },
          position: {
            type: "string",
            id: 2
          },
          startYear: {
            type: "uint32",
            id: 3
          },
          endYear: {
            type: "uint32",
            id: 4
          }
        }
      },
      CategoryPricesResponse: {
        fields: {
          medicalCategoryId: {
            type: "uint64",
            id: 1
          },
          medicalCategoryName: {
            type: "string",
            id: 2
          },
          medicalCategoryImageUrl: {
            type: "string",
            id: 3
          },
          priceMinutes_15: {
            type: "uint64",
            id: 4
          },
          priceMinutes_30: {
            type: "uint64",
            id: 5
          },
          priceMinutes_45: {
            type: "uint64",
            id: 6
          },
          priceMinutes_60: {
            type: "uint64",
            id: 7
          },
          priceSecondOpinion: {
            type: "uint64",
            id: 8
          },
          pricesEnabled: {
            type: "bool",
            id: 9
          },
          currency: {
            type: "string",
            id: 10
          },
          priceInOffice: {
            type: "uint64",
            id: 11
          },
          currencyInOffice: {
            type: "string",
            id: 12
          }
        }
      },
      CategoryPricesRequest: {
        fields: {
          medicalCategoryId: {
            type: "uint64",
            id: 1
          },
          priceMinutes_15: {
            type: "uint64",
            id: 2
          },
          priceMinutes_30: {
            type: "uint64",
            id: 3
          },
          priceMinutes_45: {
            type: "uint64",
            id: 4
          },
          priceMinutes_60: {
            type: "uint64",
            id: 5
          },
          priceSecondOpinion: {
            type: "uint64",
            id: 6
          },
          currency: {
            type: "string",
            id: 7
          },
          priceInOffice: {
            type: "uint64",
            id: 8
          },
          currencyInOffice: {
            type: "string",
            id: 9
          }
        }
      }
    }
  },
  specialist_profileV2: {
    options: {
      "(elixir_module_prefix)": "Proto.SpecialistProfileV2"
    },
    nested: {
      GetBasicInfoResponseV2: {
        fields: {
          basicInfo: {
            type: "BasicInfoV2",
            id: 1
          }
        }
      },
      UpdateBasicInfoRequestV2: {
        fields: {
          basicInfo: {
            type: "BasicInfoV2",
            id: 1
          }
        }
      },
      UpdateBasicInfoResponseV2: {
        fields: {
          basicInfo: {
            type: "BasicInfoV2",
            id: 1
          }
        }
      },
      GetProfileDescriptionResponseV2: {
        fields: {
          profileDescription: {
            type: "ProfileDescriptionV2",
            id: 1
          }
        }
      },
      UpdateProfileDescriptionRequestV2: {
        fields: {
          profileDescription: {
            type: "ProfileDescriptionV2",
            id: 1
          }
        }
      },
      UpdateProfileDescriptionResponseV2: {
        fields: {
          profileDescription: {
            type: "ProfileDescriptionV2",
            id: 1
          }
        }
      },
      GetEducationResponseV2: {
        fields: {
          education: {
            rule: "repeated",
            type: "EducationEntryV2",
            id: 1
          }
        }
      },
      UpdateEducationRequestV2: {
        fields: {
          education: {
            rule: "repeated",
            type: "EducationEntryV2",
            id: 1
          }
        }
      },
      UpdateEducationResponseV2: {
        fields: {
          education: {
            rule: "repeated",
            type: "EducationEntryV2",
            id: 1
          }
        }
      },
      GetWorkExperienceV2: {
        fields: {
          workExperience: {
            rule: "repeated",
            type: "WorkExperienceEntryV2",
            id: 1
          }
        }
      },
      UpdateWorkExperienceRequestV2: {
        fields: {
          workExperience: {
            rule: "repeated",
            type: "WorkExperienceEntryV2",
            id: 1
          }
        }
      },
      UpdateWorkExperienceResponseV2: {
        fields: {
          workExperience: {
            rule: "repeated",
            type: "WorkExperienceEntryV2",
            id: 1
          }
        }
      },
      GetMedicalInfoResponseV2: {
        fields: {
          medicalInfo: {
            type: "MedicalInfoV2",
            id: 1
          }
        }
      },
      UpdateMedicalInfoRequestV2: {
        fields: {
          medicalInfo: {
            type: "MedicalInfoV2",
            id: 1
          }
        }
      },
      UpdateMedicalInfoResponseV2: {
        fields: {
          medicalInfo: {
            type: "MedicalInfoV2",
            id: 1
          }
        }
      },
      GetInsuranceProvidersV2: {
        fields: {
          insuranceProviders: {
            rule: "repeated",
            type: "InsuranceProvidersEntryV2",
            id: 1
          },
          matchingProvider: {
            type: "MatchingInsuranceProviderV2",
            id: 2
          }
        }
      },
      UpdateInsuranceProvidersRequestV2: {
        fields: {
          insuranceProviders: {
            rule: "repeated",
            type: "InsuranceProvidersEntryV2",
            id: 1
          }
        }
      },
      UpdateInsuranceProvidersResponseV2: {
        fields: {
          insuranceProviders: {
            rule: "repeated",
            type: "InsuranceProvidersEntryV2",
            id: 1
          }
        }
      },
      SpecialistsSearchResponse: {
        fields: {
          specialists: {
            rule: "repeated",
            type: "SearchSpecialist",
            id: 1
          },
          nextToken: {
            type: "string",
            id: 2
          }
        }
      },
      GetDetailedSpecialistsResponse: {
        fields: {
          detailedSpecialists: {
            rule: "repeated",
            type: "DetailedSpecialist",
            id: 1
          }
        }
      },
      BasicInfoV2: {
        fields: {
          firstName: {
            type: "string",
            id: 1
          },
          lastName: {
            type: "string",
            id: 2
          },
          gender: {
            type: "generics.Gender",
            id: 3
          },
          birthDate: {
            type: "generics.DateTime",
            id: 4
          },
          profileImageUrl: {
            type: "string",
            id: 5
          },
          medicalTitle: {
            type: "generics.MedicalTitle",
            id: 7
          },
          phoneNumber: {
            type: "string",
            id: 8
          },
          address: {
            type: "AddressV2",
            id: 9
          }
        }
      },
      AddressV2: {
        fields: {
          street: {
            type: "string",
            id: 1
          },
          number: {
            type: "string",
            id: 2
          },
          postalCode: {
            type: "string",
            id: 3
          },
          city: {
            type: "string",
            id: 4
          },
          country: {
            type: "string",
            id: 5
          },
          neighborhood: {
            type: "string",
            id: 6
          },
          formattedAddress: {
            type: "string",
            id: 7
          },
          coordinates: {
            type: "generics.Coordinates",
            id: 8
          }
        }
      },
      ProfileDescriptionV2: {
        fields: {
          description: {
            type: "string",
            id: 1
          }
        }
      },
      EducationEntryV2: {
        fields: {
          school: {
            type: "string",
            id: 1
          },
          fieldOfStudy: {
            type: "string",
            id: 2
          },
          degree: {
            type: "string",
            id: 3
          },
          startYear: {
            type: "uint32",
            id: 4
          },
          endYear: {
            type: "uint32",
            id: 5
          }
        }
      },
      WorkExperienceEntryV2: {
        fields: {
          institution: {
            type: "string",
            id: 1
          },
          position: {
            type: "string",
            id: 2
          },
          startYear: {
            type: "uint32",
            id: 3
          },
          endYear: {
            type: "uint32",
            id: 4
          }
        }
      },
      MedicalInfoV2: {
        fields: {
          medicalCredentials: {
            type: "MedicalCredentialsV2",
            id: 1
          },
          medicalCategories: {
            rule: "repeated",
            type: "medical_categories.MedicalCategoryBase",
            id: 2
          }
        }
      },
      MedicalCredentialsV2: {
        fields: {
          boardCertificationUrl: {
            type: "string",
            id: 1
          },
          boardCertificationExpiryDate: {
            type: "generics.DateTime",
            id: 2
          },
          currentStateLicenseNumberUrl: {
            type: "string",
            id: 3
          },
          currentStateLicenseNumberExpiryDate: {
            type: "generics.DateTime",
            id: 4
          }
        }
      },
      InsuranceProvidersEntryV2: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          countryId: {
            type: "string",
            id: 3
          }
        }
      },
      MatchingInsuranceProviderV2: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      SearchSpecialist: {
        fields: {
          id: {
            type: "uint64",
            id: 1
          },
          firstName: {
            type: "string",
            id: 2
          },
          lastName: {
            type: "string",
            id: 3
          },
          avatarUrl: {
            type: "string",
            id: 4
          },
          type: {
            type: "generics.Specialist.Type",
            id: 5
          },
          "package": {
            type: "generics.Specialist.Package",
            id: 6
          },
          medicalCategories: {
            rule: "repeated",
            type: "generics.Specialist.MedicalCategory",
            id: 7
          },
          medicalTitle: {
            type: "generics.MedicalTitle",
            id: 8
          },
          location: {
            type: "AddressV2",
            id: 9
          },
          categoriesPrices: {
            rule: "repeated",
            type: "specialist_profile.CategoryPricesResponse",
            id: 10
          },
          daySchedules: {
            rule: "repeated",
            type: "visits.DaySchedule",
            id: 11
          },
          insuranceProviders: {
            rule: "repeated",
            type: "InsuranceProvidersEntryV2",
            id: 12
          }
        }
      },
      DetailedSpecialist: {
        fields: {
          specialistGenericData: {
            type: "generics.Specialist",
            id: 1
          },
          prices: {
            rule: "repeated",
            type: "specialist_profile.CategoryPricesResponse",
            id: 2
          },
          timeslots: {
            rule: "repeated",
            type: "visits.Timeslot",
            id: 3
          },
          insuranceProviders: {
            rule: "repeated",
            type: "InsuranceProvidersEntryV2",
            id: 4
          },
          matchingProvider: {
            type: "MatchingInsuranceProviderV2",
            id: 5
          }
        }
      }
    }
  },
  teams: {
    options: {
      "(elixir_module_prefix)": "Proto.Teams"
    },
    nested: {
      Role: {
        values: {
          UNKNOWN_TYPE: 0,
          MEMBER: 1,
          ADMIN: 2,
          EXTERNAL: 3
        }
      },
      MyTeam: {
        fields: {
          teamId: {
            type: "uint64",
            id: 1
          },
          location: {
            type: "generics.Coordinates",
            id: 2
          },
          formattedAddress: {
            type: "string",
            id: 3
          },
          isCurrentUserAdmin: {
            type: "bool",
            id: 4
          },
          isCurrentUserOwner: {
            type: "bool",
            id: 5
          },
          name: {
            type: "string",
            id: 6
          },
          logoUrl: {
            type: "string",
            id: 7
          }
        }
      },
      TeamInvitations: {
        fields: {
          invitations: {
            rule: "repeated",
            type: "TeamInvitation",
            id: 1
          }
        }
      },
      TeamInvitation: {
        fields: {
          teamId: {
            type: "uint64",
            id: 1
          },
          ownerProfile: {
            type: "generics.Specialist",
            id: 2
          }
        }
      },
      TeamMember: {
        fields: {
          profile: {
            type: "generics.Specialist",
            id: 1
          },
          memberRole: {
            type: "Role",
            id: 2
          },
          encountersStats: {
            type: "TeamEncountersStatsResponse",
            id: 3
          }
        }
      },
      TeamMembersResponse: {
        fields: {
          teamMembers: {
            rule: "repeated",
            type: "TeamMember",
            id: 1
          }
        }
      },
      AddMember: {
        fields: {
          specialistEmail: {
            type: "string",
            id: 1
          },
          accountType: {
            type: "Type",
            id: 2
          }
        },
        nested: {
          Type: {
            values: {
              UNKNOWN_TYPE: 0,
              GP: 1,
              NURSE: 2,
              EXTERNAL: 3
            }
          }
        }
      },
      SetRole: {
        fields: {
          newRole: {
            type: "Role",
            id: 1
          }
        }
      },
      SetTeamLocation: {
        fields: {
          location: {
            type: "generics.Coordinates",
            id: 1
          },
          formattedAddress: {
            type: "string",
            id: 2
          }
        }
      },
      SetBranding: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          logoUrl: {
            type: "string",
            id: 2
          }
        }
      },
      TeamEncountersStatsResponse: {
        fields: {
          scheduled: {
            type: "uint64",
            id: 1
          },
          pending: {
            type: "uint64",
            id: 2
          },
          completed: {
            type: "uint64",
            id: 3
          },
          canceled: {
            type: "uint64",
            id: 4
          }
        }
      },
      TeamUrgentCareStatsResponse: {
        fields: {
          total: {
            type: "uint64",
            id: 1
          }
        }
      }
    }
  },
  uploads: {
    options: {
      "(elixir_module_prefix)": "Proto.Uploads"
    },
    nested: {
      UploadResponse: {
        fields: {
          uploadUrl: {
            type: "string",
            id: 1
          },
          downloadUrl: {
            type: "string",
            id: 2
          }
        }
      },
      GetFileUploadUrlResponse: {
        fields: {
          uploadUrl: {
            type: "string",
            id: 1
          },
          resourcePath: {
            type: "string",
            id: 2
          }
        }
      },
      PostDocumentToVisitRequest: {
        fields: {
          fileName: {
            type: "string",
            id: 1
          },
          contentType: {
            type: "string",
            id: 2
          },
          recordId: {
            type: "uint64",
            id: 3
          }
        }
      }
    }
  }
});

module.exports = $root;
