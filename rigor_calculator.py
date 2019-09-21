import math

def calculate_rigor(wordlist):
    rootState = {
        'oper': lambda cur: cur,
        'next': {
            'assume': {
                'oper': lambda cur: cur + 0.3,
                'next': {}
            },
            'suppose': {
                'oper': lambda cur: cur + 0.3,
                'next': {}
            },
            'hence': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'since': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'then': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'therefore': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'thus': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'it': {
                'oper': lambda cur: cur,
                'next': {
                    'follows': {
                        'oper': lambda cur: cur + 1,
                        'next': {}
                    }
                }
            },
            'without': {
                'oper': lambda cur: cur,
                'next': {
                    'loss': {
                        'oper': lambda cur: cur,
                        'next': {
                            'of': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'generality': {
                                        'oper': lambda cur: cur**1.05,
                                        'next': {}
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'wlog': {
                'oper': lambda cur: cur**1.05,
                'next': {}
            },
            'by': {
                'oper': lambda cur: cur,
                'next': {
                    'definition': {
                        'oper': lambda cur: cur + 2,
                        'next': {}
                    },
                    'hypothesis': {
                        'oper': lambda cur: cur + 3,
                        'next': {}
                    },
                    'the': {
                        'oper': lambda cur: cur,
                        'next': {
                            'inductive': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'hypothesis': {
                                        'oper': lambda cur: cur * 1.5,
                                        'next': {}
                                    }
                                }
                            },
                            'induction': {
                                'oper': lambda cur: cur,
                                'next': {
                                    'hypothesis': {
                                        'oper': lambda cur: cur * 1.5,
                                        'next': {}
                                    }
                                }
                            }
                        }
                    },
                    'inductive': {
                        'oper': lambda cur: cur,
                        'next': {
                            'hypothesis': {
                                'oper': lambda cur: cur * 1.5,
                                'next': {}
                            }
                        }
                    },
                    'induction': {
                        'oper': lambda cur: cur,
                        'next': {
                            'hypothesis': {
                                'oper': lambda cur: cur * 1.5,
                                'next': {}
                            }
                        }
                    },
                    'symmetry': {
                        'oper': lambda cur: cur + 30,
                        'next': {}
                    }
                }
            },
            'case': {
                'oper': lambda cur: cur + 1,
                'next': {}
            },
            'claim': {
                'oper': lambda cur: cur + 5,
                'next': {}
            },
            'lemma': {
                'oper': lambda cur: cur + 10,
                'next': {}
            },
            'clearly': {
                'oper': lambda cur: cur - 11,
                'next': {}
            },
            'obviously': {
                'oper': lambda cur: cur - 22,
                'next': {}
            },
            'of': {
                'oper': lambda cur: cur,
                'next': {
                    'course': {
                        'oper': lambda cur: cur - 33,
                        'next': {}
                    }
                }
            },
            'in': {
                'oper': lambda cur: cur,
                'next': {
                    'particular': {
                        'oper': lambda cur: cur * 1.1,
                        'next': {}
                    }
                }
            },
            'qed': {
                'oper': lambda cur: cur + 50,
                'next': {}
            },
            'where': {
                'oper': lambda cur: cur - 0.5,
                'next': {}
            }
        }
    }
    state = rootState
    score = 100
    for word in wordlist:
        word = word.lower()
        state = state['next'].get(word)

        if not state:
            state = rootState['next'].get(word)
        
        if not state:
            state = rootState

        score = state['oper'](score)

    return score

print(calculate_rigor('therefore without loss of generality'.split(' ')))
